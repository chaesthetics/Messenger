<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class SearchUserController extends Controller
{
    public function __invoke(Request $request)
    {
        try{
            $search = $request->userName;
            $users = User::where('firstname', 'LIKE', "%{$search}%")
                ->orWhere('lastname', 'LIKE', "%{$search}%")
                ->get();
    
            return response()->json([
                'status' => 200,
                'users' => $users,
            ]);
        } catch(\Throwable $th){
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage(),
            ]);
        }
        
    }
}