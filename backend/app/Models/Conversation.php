<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Conversation extends Model
{
    use HasFactory;
    protected $fillable = [
        'sender_id',
        'receiver_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

}
