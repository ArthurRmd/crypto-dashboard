<?php

namespace App\Http\Controllers;


use App\Enums\ForexCurrency;
use App\Enums\Language;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\DocBlock\Tags\Reference\Fqsen;

class ForexCurrencyController extends Controller
{

    public function getAll()
    {
        return response()->json([
            ForexCurrency::EUR,
            ForexCurrency::USD,
            ForexCurrency::CAD,
            ForexCurrency::JPY,
        ]);
    }


    public function change(Request $request)
    {
        $forexCurency = ForexCurrency::tryFrom($request->get('forex_currency'));

        if ($forexCurency === null) {
            return response()->json([],400);
        }

        $user = $request->user();
        $user->forex_currency = $forexCurency;
        $user->save();

        return response()->json([],201);
    }
}
