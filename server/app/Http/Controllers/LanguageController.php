<?php

namespace App\Http\Controllers;


use App\Enums\Language;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\DocBlock\Tags\Reference\Fqsen;

class LanguageController extends Controller
{

    public function getAll()
    {
        return response()->json([
            Language::FRENCH,
            Language::ENGLISH,
        ]);
    }


    public function change(Request $request)
    {
        $language = Language::tryFrom($request->get('language'));

        if ($language === null) {
            return response()->json([],400);
        }

        $user = $request->user();
        $user->language = $language;
        $user->save();

        return response()->json([],201);
    }
}
