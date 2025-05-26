
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\HostCity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\HostCityResource;

class HostCityController extends Controller
{
    public function index(Request $request)
    {
        $query = HostCity::with('stadiums');

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort by name by default
        $sortField = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $hostCities = $query->get();

        return response()->json([
            'success' => true,
            'data' => HostCityResource::collection($hostCities)
        ]);
    }

    public function show($name)
    {
        $hostCity = HostCity::where('name', $name)->with('stadiums')->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new HostCityResource($hostCity)
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100|unique:host_cities,name',
            'description' => 'required|string',
            'attractions' => 'required|array',
            'attractions.*' => 'string',
            'image' => 'required|url',
            'image_alt' => 'nullable|string|max:255',
            'population' => 'required|integer|min:1',
            'stadium' => 'required|string|max:255',
            'distance_from_airport' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $hostCity = HostCity::create([
            'name' => $request->name,
            'description' => $request->description,
            'attractions' => json_encode($request->attractions),
            'image' => $request->image,
            'image_alt' => $request->image_alt,
            'population' => $request->population,
            'stadium' => $request->stadium,
            'distance_from_airport' => $request->distance_from_airport,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Host city created successfully',
            'data' => new HostCityResource($hostCity)
        ], 201);
    }

    public function update(Request $request, HostCity $hostCity)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:100|unique:host_cities,name,' . $hostCity->id,
            'description' => 'sometimes|string',
            'attractions' => 'sometimes|array',
            'attractions.*' => 'string',
            'image' => 'sometimes|url',
            'image_alt' => 'sometimes|nullable|string|max:255',
            'population' => 'sometimes|integer|min:1',
            'stadium' => 'sometimes|string|max:255',
            'distance_from_airport' => 'sometimes|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['id']);
        if ($request->has('attractions')) {
            $data['attractions'] = json_encode($request->attractions);
        }

        $hostCity->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Host city updated successfully',
            'data' => new HostCityResource($hostCity)
        ]);
    }

    public function destroy(HostCity $hostCity)
    {
        $hostCity->delete();

        return response()->json([
            'success' => true,
            'message' => 'Host city deleted successfully'
        ]);
    }
}
