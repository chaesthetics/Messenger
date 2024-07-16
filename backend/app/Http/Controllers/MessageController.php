<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\User;

class MessageController extends Controller
{
    public function createMessage(Request $request)
    {
        try{
            $message = new Message;
            $message->conversation_id = $request->conversation_id;
            $message->sender_id = $request->sender_id;
            $message->content = $request->content;
    
            $message->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Message sent',
            ], 200);
        }catch(\Throwable $th){
            return response()->json([
                'status' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }
    public function getMessages(Request $request)
    {
        try{
            $messages = Message::where('conversation_id', '=', $request->conversation_id)
                                ->with('user')
                                ->get();
            // foreach($messages as $message){
            //     $message->sender = User::find($message->sender_id);
            // }
            return response()->json([
                'status' => 'success',
                'messages' => $messages,
            ], 200);
        }catch(\Throwable $th){
            return response()->json([
                'status' => 'failed',
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
