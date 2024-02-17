<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
/**
 * Class AuthService.
 */
class AuthService
{
    public function register(array $userData)
    {
        $user = User::create([
            'firstname' => $userData['firsname'],
            'lastname' =>  $userData['lastname'],
            'email' => $userData['email'],
            'password' => bcrypt($userData['password'])
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return $token;
    }

}
