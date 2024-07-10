<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationController extends Controller
{
    public function createConvo(Request $request)
    {
        try{
            $conversation = new Conversation;
            $conversation->sender_id = $request->sender_id;
            $conversation->receiver_id = $request->receiver_id;
            $conversation->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Conversation has been created'
            ], 200);
        }catch(\Throwable $th){
            return response()->json([
                'status' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
   
    }
}
