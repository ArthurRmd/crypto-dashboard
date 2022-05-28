<?php

namespace App\Http\Controllers;

use App\Models\Crypto;
use App\Models\User;
use App\Service\ConvertCurrencyService;
use Carbon\CarbonImmutable;
use Colors\RandomColor;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class StatisticController extends Controller
{

    public function investments(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $userCurrency = $user->forex_currency;

        $user->load('investments.crypto');

        $investments = $user->investments;

        $labels = [];
        $values = [];
        $colors = [];

        $userCurrency = $user->forex_currency;
        foreach ($investments as $investment) {
            $labels[] = $investment->crypto->name;
            $values[] = ConvertCurrencyService::usdTo($investment->price_usd, $userCurrency);
            $colors[] = RandomColor::one();
        }

        $pieData = compact('labels', 'values', 'colors');

        $now = CarbonImmutable::now();
        $months = [];
        $totalByMonth = [];
        $lastTotalUsd = $investment->sum('price_usd');

        for ($i = 0; $i < 12; ++$i) {
            $months[] = $now->format('F');
            $totalByMonth[] = $lastTotalUsd;
            $now = $now->subMonth();
            $lastTotalUsd += random_int(-100, 100);
        }

        $lineData = compact('months', 'totalByMonth');
        return response()
            ->json([
                'pie' => $pieData,
                'line' => $lineData,
            ]);
    }


    public function dashboard()
    {
        $now = CarbonImmutable::now();
        $months = [];

        for ($i = 0; $i < 12; ++$i) {
            $months[] = $now->format('F');
            $now = $now->subMonth();
        }

        $cryptos = Crypto::query()
            ->orderBy('price_usd', 'desc')
            ->limit(10)
            ->get();

        $cryptosData = [];

        foreach ($cryptos as $crypto) {
            $lastValue = $crypto->price_usd;

            for ($i = 0; $i < 12; ++$i) {
                $cryptosData[$crypto->name][] = $lastValue;
                $lastValue += random_int(-($crypto->price_usd / 10),($crypto->price_usd / 10));
            }
        }



        return response()
            ->json([
                'months' => $months,
                'crypto_data' => $cryptosData,
            ]);
    }
}
