
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Stadium;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\StadiumResource;
use App\Http\Resources\MatchResource;

class StadiumController extends Controller
{
    public function index(Request $request)
    {
        $query = Stadium::with('hostCity');

        // Filter by city
        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort by various fields
        $sortField = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $stadiums = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => StadiumResource::collection($stadiums),
            'meta' => [
                'current_page' => $stadiums->currentPage(),
                'last_page' => $stadiums->lastPage(),
                'per_page' => $stadiums->perPage(),
                'total' => $stadiums->total(),
            ]
        ]);
    }

    public function show(Stadium $stadium)
    {
        $stadium->load('hostCity', 'matches');

        return response()->json([
            'success' => true,
            'data' => new StadiumResource($stadium)
        ]);
    }

    public function matches(Stadium $stadium)
    {
        $matches = $stadium->matches()->with(['homeTeam', 'awayTeam'])->get();

        return response()->json([
            'success' => true,
            'data' => MatchResource::collection($matches)
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'capacity' => 'required|integer|min:1',
            'image' => 'required|url',
            'status' => 'required|in:Operational,Under Construction,Planned',
            'progress' => 'required|integer|min:0|max:100',
            'description' => 'required|string',
            'features' => 'required|array',
            'features.*' => 'string',
            'matches' => 'required|integer|min:0',
            'start_date' => 'required|date',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $stadium = Stadium::create([
            'name' => $request->name,
            'city' => $request->city,
            'capacity' => $request->capacity,
            'image' => $request->image,
            'status' => $request->status,
            'progress' => $request->progress,
            'description' => $request->description,
            'features' => json_encode($request->features),
            'matches' => $request->matches,
            'start_date' => $request->start_date,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Stadium created successfully',
            'data' => new StadiumResource($stadium)
        ], 201);
    }

    public function update(Request $request, Stadium $stadium)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:100',
            'capacity' => 'sometimes|integer|min:1',
            'image' => 'sometimes|url',
            'status' => 'sometimes|in:Operational,Under Construction,Planned',
            'progress' => 'sometimes|integer|min:0|max:100',
            'description' => 'sometimes|string',
            'features' => 'sometimes|array',
            'features.*' => 'string',
            'matches' => 'sometimes|integer|min:0',
            'start_date' => 'sometimes|date',
            'latitude' => 'sometimes|numeric|between:-90,90',
            'longitude' => 'sometimes|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['id']);
        if ($request->has('features')) {
            $data['features'] = json_encode($request->features);
        }

        $stadium->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Stadium updated successfully',
            'data' => new StadiumResource($stadium)
        ]);
    }

    public function destroy(Stadium $stadium)
    {
        $stadium->delete();

        return response()->json([
            'success' => true,
            'message' => 'Stadium deleted successfully'
        ]);
    }
}
