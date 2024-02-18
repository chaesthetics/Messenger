<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;

class AuthService
{
    public function register(array $userData)
    {
        $user = User::create([
            'firstname' => $userData['firstname'],
            'lastname' =>  $userData['lastname'],
            'email' => $userData['email'],
            'password' => bcrypt($userData['password'])
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return $token;
    }

    public function login(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();
        if(!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['error' => 'The provided credentials are incorrect.'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return $token;
    }

}
