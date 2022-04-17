<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * @param  StoreUserRequest  $userRequest
     * @return JsonResponse
     */
    public function store(StoreUserRequest $userRequest): JsonResponse
    {
        $user = User::create([
            'name'=> $userRequest->get('name'),
            'email'=> $userRequest->get('email'),
            'password'=> bcrypt($userRequest->get('password')),
        ]);

        return response()
            ->json([
                'success'   => true,
                'data'      => $user,
            ]);
    }

}
