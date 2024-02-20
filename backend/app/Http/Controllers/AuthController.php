<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Http\Response;
use App\Models\User;


class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        try{
            $token = $this->authService->register($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Registered Succesfully',
                'token' => $token,
            ], Response::HTTP_CREATED);
        }catch(\Throwable $th){
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
       
    }

    public function login(Request $request)
    {
        $token = $this->authService->login($request->all());
        return response()->json(['token'=>$token], Response::HTTP_CREATED);
    }
}
