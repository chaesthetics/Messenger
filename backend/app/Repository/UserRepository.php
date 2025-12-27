<?php

namespace App\Repository;

use App\Models\User;
class UserRepository 
{
    public function fetchAll()
    {
        $users = User::all();

        return $users->toArray();
    }
}