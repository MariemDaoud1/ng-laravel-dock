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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|string|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "status" => 0,
                "errors" => $validator->errors()->all()
            ]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $response = [];
        $response['token'] = $user->createToken('auth-token')->plainTextToken;
        $response['name'] = $user->name;
        $response['email'] = $user->email;
        return response()->json([
            "status" => 1,
            "message" => "User registered successfully",
            "data" => $response
        ]);
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
        ]);
    }
}
