<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function uploadImage(Request $request)
    {
        try {
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Max 2MB
                'id' => 'required|exists:posts,id', // Required to update an existing post
            ]);

            $imagePath = $request->file('image')->store('images', 'public');

            $post = Post::findOrFail($validated['id']);
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = $imagePath;
            $post->save();

            return response()->json([
                'data' => [
                    'id' => $post->id,
                    'image_url' => asset('storage/' . $imagePath),
                    'message' => 'Image uploaded for post ID ' . $post->id,
                    'image' => $post->image ? asset('storage/' . $post->image) : null,
                ],
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to upload image: ' . $e->getMessage(),
            ], 500);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all()->map(function ($post) {
            return [
                'id' => $post->id,
                'Title' => $post->Title,
                'description' => $post->description,
                'image' => $post->image ? asset('storage/' . $post->image) : null,
            ];
        });

        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'Title' => 'required|string|max:25',
                'description' => 'required|string|max:1000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image if provided
            ]);
            // If an image is uploaded, handle the file upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $request->merge(['image' => 'images/' . $imageName]); // Store the path of the image
            } else {
                $request->merge(['image' => null]); // If no image is uploaded, set image to null
            }
            // Create a new post using the validated data   
            $data = $request->all();
            $post = Post::create($data);
            return response()->json([
                'data' => $post,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create post: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findOrFail($id);
        return response()->json(
            [
                "id" => $post->id,
                "Title" => $post->Title,
                "description" => $post->description,
                "image" => $post->image ? asset('storage/' . $post->image) : null,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::find($id);
        $post->title = $request->input('Title');
        $post->description = $request->input('description');
        $post->save();
        return response()->json(
            [
                "id" => $post->id,
                "Title" => $post->Title,
                "description" => $post->description,
                "image" => $post->image ? asset('storage/' . $post->image) : null,
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::destroy($id);
        return response()->json(
            [
                "message" => "Post deleted successfully",
                "id" => $id,
            ]
        );
    }
}
