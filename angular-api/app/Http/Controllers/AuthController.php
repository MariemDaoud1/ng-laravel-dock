<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function user(Request $request)
    {
        return response()->json([$request->user()]);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:25',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|string|same:password',
        ]);

        // return response()->json(['name' => $request->name]);

        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "message" => "Validation failed",
                "errors" => $validator->errors(), // returns { field: [error1, error2] }
                "debug" => "Ensure all required fields are present and correctly formatted."
            ], 422); // 422 = Unprocessable Entity
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $response = [
                'token' => $user->createToken('auth-token')->plainTextToken,
                'name' => $user->name,
                'email' => $user->email
            ];

            return response()->json([
                "status" => 1,
                "message" => "User registered successfully",
                "data" => $response
            ], 201); // 201 = Created
        } catch (\Exception $e) {
            return response()->json([
                "status" => 0,
                "message" => "User registration failed",
                "error" => $e->getMessage()
            ], 500); // Internal Server Error
        }
    }

    public function login(Request $request)
    {

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $response = [];
            $response['token'] = $user->createToken('auth-token')->plainTextToken;
            $response['name'] = $user->name;
            $response['email'] = $user->email;
            return response()->json(
                [
                    "status" => 1,
                    "message" => "User logged in successfully",
                    "data" => $response
                ]
            );
        }
        return response()->json([
            "status" => 0,
            "message" => "Invalid credentials"
        ], 401);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->tokens()->delete();

            return response()->json([
                "status" => 1,
                "message" => "User logged out successfully"
            ]);
        }

        return response()->json([
            "status" => 0,
            "message" => "No user is logged in"
        ], 401);
    }
}
