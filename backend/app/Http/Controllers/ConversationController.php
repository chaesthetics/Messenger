<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\User;
class ConversationController extends Controller
{
    public function createConvo(Request $request)
    {
        try{
            if((Conversation::where('sender_id', '=', $request->sender_id)->where('receiver_id', '=', $request->receiver_id)->count() > 0 ) 
            || (Conversation::where('sender_id', '=', $request->receiver_id)->where('receiver_id', '=', $request->sender_id)->count() > 0 ) )
            {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Conversation already exist'
                ], 200);
            }else{
                $conversation = new Conversation;
                $conversation->sender_id = $request->sender_id;
                $conversation->receiver_id = $request->receiver_id;
                $conversation->save();
    
                return response()->json([
                    'status' => 'success',
                    'message' => 'Conversation has been created'
                ], 200);
            }
        }catch(\Throwable $th){
            return response()->json([
                'status' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function getConversations(Request $request)
    {
        try{
            $conversations = Conversation::where('sender_id', '=', $request->userinfo_id)->orWhere('receiver_id', '=', $request->userinfo_id)
            ->get();
            foreach($conversations as $conversation ){
                $chatwith = 0; 
                if($conversation->sender_id == $request->userinfo_id){
                    $chatwith = $conversation->receiver_id;
                }else{
                    $chatwith = $conversation->sender_id;
                }
                $conversation->chatwith = User::find($chatwith);
            }
    
            return response()->json([
                "status" => "success",
                "conversations" => $conversations
            ], 200);
        }catch(\Throwable $th){
            return response()->json([
                "status" => "failed",
                "message" => $th->getMessage(),
            ], 500);
        }
    }
}
