<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvestmentRequest\StoreInvestmentRequest;
use App\Models\Crypto;
use App\Models\Investment;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvestmentController extends Controller
{
    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getUserData(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->load('investments.crypto');

        return response()
            ->json([
                'success' => true,
                'data' => $user->investments,
            ]);
    }


    /**
     * @param  Crypto  $crypto
     * @param  StoreInvestmentRequest  $request
     * @return JsonResponse
     */
    public function store(Crypto $crypto, StoreInvestmentRequest $request): JsonResponse
    {
        $user = $request->user();

        $investment =Investment::create([
            'crypto_id'=> $crypto->id,
            'user_id'=> $user->id,
            'crypto_value'=> $request->get('price_usd') / $crypto->price_usd,
            'price_usd'=> $request->get('price_usd'),
        ]);

        $investment->load('crypto');

        return response()
            ->json([
                'success' => true,
                'data' => $investment,
            ],201);
    }
}
