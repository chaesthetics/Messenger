<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/signin', [AuthController::class, 'login']);
Route::get('/getUsers', [ConversationController::class, 'getUsers']);
Route::post('/createConvo', [ConversationController::class, 'createConvo']);
Route::post('/createMessage', [MessageController::class, 'createMessage']);
Route::get('/getMessages/{conversation_id}', [MessageController::class, 'getMessages']);

Route::get('/getConversations/{userinfo_id}', [ConversationController::class, 'getConversations']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
