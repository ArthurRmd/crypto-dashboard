<?php

use App\Enums\ForexCurrency;

class ConvertCurrency
{

    public static function usdTo(float $priceUsd, ForexCurrency $forexCurrency) :float
    {
        return match ($forexCurrency) {
            ForexCurrency::USD => $priceUsd,
            ForexCurrency::EUR => $priceUsd * 1.2 ,
            ForexCurrency::CAD => $priceUsd * 0.8,
            ForexCurrency::JPY => $priceUsd * 2,
        };
    }
}
