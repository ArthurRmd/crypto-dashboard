<?php

namespace App\Http\Controllers;

use App\Models\Crypto;
use App\Service\ConvertCurrencyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CryptoController extends Controller
{

    /**
     * @return JsonResponse
     */
    public function index(?int $page = null): JsonResponse
    {
        $user = request()?->user();

        if ($user === null) {
            abort(404);
        }

        $cryptos = Crypto::query()
            ->orderBy('price_usd', 'desc')
            ->when($page, fn($query) => $query->limit($page))
            ->get()
            ->toArray();

        $userCurrency = $user->forex_currency;
        foreach ($cryptos as &$crypto) {
            $crypto['price_forex'] = ConvertCurrencyService::usdTo($crypto['price_usd'], $userCurrency);
        }

        return response()
            ->json([
                'success' => true,
                'data' => $cryptos,
            ]);

    }
}
