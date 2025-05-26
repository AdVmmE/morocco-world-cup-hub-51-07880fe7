
<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\NewsResource;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::query();

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('summary', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Sort by date by default
        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $news = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => NewsResource::collection($news),
            'meta' => [
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
            ]
        ]);
    }

    public function show(News $news)
    {
        return response()->json([
            'success' => true,
            'data' => new NewsResource($news)
        ]);
    }

    public function byCategory($category)
    {
        $news = News::where('category', $category)
                   ->orderBy('created_at', 'desc')
                   ->get();

        return response()->json([
            'success' => true,
            'data' => NewsResource::collection($news)
        ]);
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string|min:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $searchQuery = $request->query;
        $news = News::where(function($q) use ($searchQuery) {
            $q->where('title', 'like', "%{$searchQuery}%")
              ->orWhere('summary', 'like', "%{$searchQuery}%")
              ->orWhere('content', 'like', "%{$searchQuery}%");
        })->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => NewsResource::collection($news)
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'image' => 'required|url',
            'tags' => 'required|array',
            'tags.*' => 'string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $news = News::create([
            'title' => $request->title,
            'summary' => $request->summary,
            'content' => $request->content,
            'author' => $request->author,
            'category' => $request->category,
            'image' => $request->image,
            'tags' => json_encode($request->tags),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'News created successfully',
            'data' => new NewsResource($news)
        ], 201);
    }

    public function update(Request $request, News $news)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'summary' => 'sometimes|string|max:500',
            'content' => 'sometimes|string',
            'author' => 'sometimes|string|max:100',
            'category' => 'sometimes|string|max:100',
            'image' => 'sometimes|url',
            'tags' => 'sometimes|array',
            'tags.*' => 'string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except(['id']);
        if ($request->has('tags')) {
            $data['tags'] = json_encode($request->tags);
        }

        $news->update($data);

        return response()->json([
            'success' => true,
            'message' => 'News updated successfully',
            'data' => new NewsResource($news)
        ]);
    }

    public function destroy(News $news)
    {
        $news->delete();

        return response()->json([
            'success' => true,
            'message' => 'News deleted successfully'
        ]);
    }
}
