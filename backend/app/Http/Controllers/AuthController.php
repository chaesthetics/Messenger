<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $userData = $request->validated();
        $token = $this->authService->register($userData);

        return response()->json(['token'=>$token], Response::HTTP_CREATED);
    }
}
