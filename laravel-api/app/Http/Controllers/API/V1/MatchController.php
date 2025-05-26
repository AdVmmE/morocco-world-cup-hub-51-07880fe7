
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Match;
use App\Models\Stadium;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MatchResource;

class MatchController extends Controller
{
    public function index(Request $request)
    {
        $query = Match::with(['stadium']);

        // Filter by stadium
        if ($request->has('stadium_id')) {
            $query->where('stadium_id', $request->stadium_id);
        }

        // Filter by team
        if ($request->has('team')) {
            $query->where(function($q) use ($request) {
                $q->where('home_team', $request->team)
                  ->orWhere('away_team', $request->team);
            });
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by round/group
        if ($request->has('round')) {
            $query->where('round', $request->round);
        }
        if ($request->has('group')) {
            $query->where('group', $request->group);
        }

        // Sort by date by default
        $sortField = $request->get('sort', 'date');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $matches = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => MatchResource::collection($matches),
            'meta' => [
                'current_page' => $matches->currentPage(),
                'last_page' => $matches->lastPage(),
                'per_page' => $matches->perPage(),
                'total' => $matches->total(),
            ]
        ]);
    }

    public function show(Match $match)
    {
        $match->load('stadium', 'tickets');

        return response()->json([
            'success' => true,
            'data' => new MatchResource($match)
        ]);
    }

    public function byStadium($stadiumId)
    {
        $stadium = Stadium::findOrFail($stadiumId);
        $matches = $stadium->matches()->with('stadium')->get();

        return response()->json([
            'success' => true,
            'data' => MatchResource::collection($matches)
        ]);
    }

    public function byTeam($team)
    {
        $matches = Match::where('home_team', $team)
                       ->orWhere('away_team', $team)
                       ->with('stadium')
                       ->get();

        return response()->json([
            'success' => true,
            'data' => MatchResource::collection($matches)
        ]);
    }

    public function byDateRange(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $matches = Match::whereBetween('date', [$request->start_date, $request->end_date])
                       ->with('stadium')
                       ->orderBy('date', 'asc')
                       ->get();

        return response()->json([
            'success' => true,
            'data' => MatchResource::collection($matches)
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'home_team' => 'required|string|max:100',
            'away_team' => 'required|string|max:100',
            'date' => 'required|date',
            'time' => 'required|string',
            'stadium_id' => 'required|exists:stadiums,id',
            'group' => 'nullable|string|max:50',
            'round' => 'nullable|string|max:50',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'status' => 'required|in:scheduled,live,completed',
            'highlight_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $match = Match::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Match created successfully',
            'data' => new MatchResource($match)
        ], 201);
    }

    public function update(Request $request, Match $match)
    {
        $validator = Validator::make($request->all(), [
            'home_team' => 'sometimes|string|max:100',
            'away_team' => 'sometimes|string|max:100',
            'date' => 'sometimes|date',
            'time' => 'sometimes|string',
            'stadium_id' => 'sometimes|exists:stadiums,id',
            'group' => 'sometimes|nullable|string|max:50',
            'round' => 'sometimes|nullable|string|max:50',
            'home_score' => 'sometimes|nullable|integer|min:0',
            'away_score' => 'sometimes|nullable|integer|min:0',
            'status' => 'sometimes|in:scheduled,live,completed',
            'highlight_url' => 'sometimes|nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $match->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Match updated successfully',
            'data' => new MatchResource($match)
        ]);
    }

    public function destroy(Match $match)
    {
        $match->delete();

        return response()->json([
            'success' => true,
            'message' => 'Match deleted successfully'
        ]);
    }
}
