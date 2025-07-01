<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function uploadImage(Request $request)
    {
        try {
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
                'id' => 'required|exists:posts,id',
            ]);

            // Fetch only if it belongs to the logged-in user
            $post = Post::findOrFail($validated['id']);


            $imagePath = $request->file('image')->store('images', 'public');

            // Delete previous image if exists
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

    public function index(Request $request)
    {
        // Return only posts belonging to the authenticated user
        $posts = $request->user()->posts()->get()->map(function ($post) {
            $imagePath = $post->image ? asset('storage/' . $post->image) : null;
            return [
                'id' => $post->id,
                'Title' => $post->Title,
                'description' => $post->description,
                'image' => $imagePath,
            ];
        });

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'Title' => 'required|string|max:25',
                'description' => 'required|string|max:1000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $request->merge(['image' => 'images/' . $imageName]);
            } else {
                $request->merge(['image' => null]);
            }

            // Create post for the authenticated user
            $post = $request->user()->posts()->create($request->only(['Title', 'description', 'image']));

            return response()->json(['data' => $post], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create post: ' . $e->getMessage()], 500);
        }
    }

    public function show(Request $request, string $id)
    {
        // Only show post if it belongs to the user
        $post = $request->user()->posts()->findOrFail($id);

        return response()->json([
            "id" => $post->id,
            "Title" => $post->Title,
            "description" => $post->description,
            "image" => $post->image ? asset('storage/' . $post->image) : null,
        ]);
    }

    public function update(Request $request, string $id)
    {
        // Only update post if it belongs to the user
        $post = $request->user()->posts()->findOrFail($id);

        $request->validate([
            'Title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $post->Title = $request->input('Title');
        $post->description = $request->input('description');
        $post->save();

        return response()->json([
            "id" => $post->id,
            "Title" => $post->Title,
            "description" => $post->description,
            "image" => $post->image ? asset('storage/' . $post->image) : null,
        ]);
    }

    public function destroy(Request $request, string $id)
    {
        // Only delete post if it belongs to the user
        $post = $request->user()->posts()->findOrFail($id);
        $post->delete();

        return response()->json([
            "message" => "Post deleted successfully",
            "id" => $id,
        ]);
    }
}
