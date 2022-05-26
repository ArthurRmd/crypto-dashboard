<?php


namespace App\Enums;


enum ForexCurrency :string
{
    case EUR = 'eur';
    case USD = 'usd';
    case CAD = 'canadian_dollar';
    case JPY = 'japanese_yen';
}
