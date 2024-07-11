<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserCollection;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Http\Response;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Models\Conversation;

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
                'status' => Response::HTTP_CREATED,
                'message' => 'Registered Succesfully',
                'token' => $token,
            ], Response::HTTP_CREATED);
        }catch(\Throwable $th){
            return response()->json([
                'status' => Response::HTTP_METHOD_NOT_ALLOWED,
                'message' => $th->getMessage(),
            ], Response::HTTP_METHOD_NOT_ALLOWED);
        }
    }

    public function login(Request $request)
    {
        try{
            $token = $this->authService->login($request->all());
            $user = User::where('email', $request->email)->first();
            if(gettype($token)=='string'){
                return response()->json([
                    'status' => Response::HTTP_OK,
                    'message' => 'Logged In Successfully',
                    'userData' => $user,
                    'token'=>$token,
                ], Response::HTTP_OK);
            }else{
                return response()->json([
                    'status' => Response::HTTP_METHOD_NOT_ALLOWED,
                    'message' => 'Log In Failed',
                ], Response::HTTP_METHOD_NOT_ALLOWED);
            }
        }catch(\Throwable $th){
            return response()->json([
                'status' => Response::HTTP_METHOD_NOT_ALLOWED,
                'message' => $th->getMessage(),
            ], Response::HTTP_METHOD_NOT_ALLOWED);
        }
    }

    public function getUsers(Request $request)
    {
        return UserResource::collection(User::all());
    }
}
