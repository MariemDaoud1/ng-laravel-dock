<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
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
            ]);
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

        return response()->json(
            [
                "id" => $post->id,
                "Title" => $post->Title,
                "description" => $post->description,
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        return response()->json(
            [
                "id" => $post->id,
                "Title" => $post->Title,
                "description" => $post->description,
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
