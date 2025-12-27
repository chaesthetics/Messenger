<?php

namespace App\Services;

use App\Models\User;
class UserCRUDService
{
    public function fetchAll()
    {
        $users = User::all();

        return $users->toArray();
    }
}

