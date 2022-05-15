<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest\LoginUserRequest;
use App\Http\Requests\UserRequest\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * @param  StoreUserRequest  $userRequest
     * @return JsonResponse
     */
    public function register(StoreUserRequest $userRequest): JsonResponse
    {
        $user = User::create([
            'name' => $userRequest->get('name'),
            'email' => $userRequest->get('email'),
            'password' => bcrypt($userRequest->get('password')),
        ]);

        return response()
            ->json([
                'success' => true,
                'data' => $user,
            ]);
    }

    /**
     * @param  LoginUserRequest  $request
     * @return JsonResponse
     */
    public function login(LoginUserRequest $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user?->createToken('LaravelSanctumAuth')
                ?->plainTextToken;

            return response()
                ->json([
                    'success' => true,
                    'data' => compact('token','user'),
                ]);
        }

        return response()
            ->json([
                'success' => false,
                'message' => 'email and password doesn\'t match',
            ]);
    }


    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getData(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()
            ->json([
                'success' => true,
                'data' => $user,
            ]);
    }

    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $newData = [
            'name' => $request->get('name', $user->name),
            'email' => $request->get('email', $user->email),
        ];

        if ($request->has('password')) {
            $newData['password'] = $request->has('password');
        }

        $response = $user->update($newData);

        return response()
            ->json([
                'success' => $response,
                'message' => $response ? 'user updated' : 'user not updated',
            ]);
    }
}
