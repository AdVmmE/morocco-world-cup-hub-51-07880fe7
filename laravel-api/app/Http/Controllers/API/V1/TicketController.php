
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Match;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TicketResource;

class TicketController extends Controller
{
    public function byMatch(Match $match)
    {
        $tickets = $match->tickets()->get();

        return response()->json([
            'success' => true,
            'data' => TicketResource::collection($tickets)
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'match_id' => 'required|exists:matches,id',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string|size:3',
            'available' => 'required|integer|min:0',
            'max_per_person' => 'required|integer|min:1',
            'seat_type' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $ticket = Ticket::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Ticket created successfully',
            'data' => new TicketResource($ticket)
        ], 201);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $validator = Validator::make($request->all(), [
            'match_id' => 'sometimes|exists:matches,id',
            'category' => 'sometimes|string|max:100',
            'price' => 'sometimes|numeric|min:0',
            'currency' => 'sometimes|string|size:3',
            'available' => 'sometimes|integer|min:0',
            'max_per_person' => 'sometimes|integer|min:1',
            'seat_type' => 'sometimes|nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $ticket->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Ticket updated successfully',
            'data' => new TicketResource($ticket)
        ]);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ticket deleted successfully'
        ]);
    }
}
