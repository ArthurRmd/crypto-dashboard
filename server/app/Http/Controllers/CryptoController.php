<?php

namespace App\Http\Controllers;

use App\Models\Crypto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CryptoController extends Controller
{

    /**
     * @return JsonResponse
     */
    public function index(?int $page = null): JsonResponse
    {
        $cryptos = Crypto::query()
            ->orderBy('price_usd', 'desc')
            ->when($page, fn($query) => $query->limit($page))
            ->get();

        return response()
            ->json([
                'success' => true,
                'data' => $cryptos,
            ]);

    }
}
