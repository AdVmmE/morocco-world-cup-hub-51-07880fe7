
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\UserTicket;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserTicketResource;

class UserTicketController extends Controller
{
    public function index(Request $request)
    {
        $userTickets = $request->user()
                              ->userTickets()
                              ->with(['ticket.match.stadium'])
                              ->orderBy('created_at', 'desc')
                              ->get();

        return response()->json([
            'success' => true,
            'data' => UserTicketResource::collection($userTickets)
        ]);
    }

    public function show(UserTicket $userTicket)
    {
        // Ensure user can only see their own tickets
        if ($userTicket->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $userTicket->load(['ticket.match.stadium']);

        return response()->json([
            'success' => true,
            'data' => new UserTicketResource($userTicket)
        ]);
    }

    public function book(Request $request, Ticket $ticket)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
            'owner_name' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $quantity = $request->quantity;

        // Check availability
        if ($ticket->available < $quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Not enough tickets available'
            ], 400);
        }

        // Check max per person limit
        if ($quantity > $ticket->max_per_person) {
            return response()->json([
                'success' => false,
                'message' => "Maximum {$ticket->max_per_person} tickets per person allowed"
            ], 400);
        }

        // Create user ticket booking
        $userTicket = UserTicket::create([
            'user_id' => $request->user()->id,
            'ticket_id' => $ticket->id,
            'quantity' => $quantity,
            'total_price' => $ticket->price * $quantity,
            'currency' => $ticket->currency,
            'owner_name' => $request->owner_name,
            'owner_email' => $request->owner_email,
            'status' => 'active',
            'purchase_date' => now(),
        ]);

        // Update ticket availability
        $ticket->decrement('available', $quantity);

        $userTicket->load(['ticket.match.stadium']);

        return response()->json([
            'success' => true,
            'message' => "Successfully booked {$quantity} tickets",
            'data' => new UserTicketResource($userTicket)
        ], 201);
    }

    public function cancel(UserTicket $userTicket)
    {
        // Ensure user can only cancel their own tickets
        if ($userTicket->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // Check if ticket can be cancelled (not used)
        if ($userTicket->status === 'used') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot cancel used tickets'
            ], 400);
        }

        // Update ticket availability
        $userTicket->ticket->increment('available', $userTicket->quantity);

        // Update status
        $userTicket->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Ticket booking cancelled successfully'
        ]);
    }
}
