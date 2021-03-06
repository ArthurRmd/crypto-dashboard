<?php

use App\Http\Controllers\CryptoController;
use App\Http\Controllers\ForexCurrencyController;
use App\Http\Controllers\InvestmentController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('test', fn() => response()->json(['message' => 'Api work']));

Route::get('/error-token', fn() => response()->json([
    'error' => true,
    'message' => 'Invalid token',
], 401))
    ->name('error-token');

Route::controller(UserController::class)
    ->prefix('users')
    ->name('users.')
    ->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
        Route::get('/', 'getData')->middleware('auth:sanctum');
        Route::patch('/', 'update')->middleware('auth:sanctum');
    });


Route::controller(CryptoController::class)
    ->prefix('cryptos')
    ->name('cryptos.')
    ->group(function () {
        Route::get('/{page?}', 'index')->where('page','[0-9]+')->middleware('auth:sanctum');
    });


Route::controller(InvestmentController::class)
    ->prefix('investments')
    ->name('investments.')
    ->group(function () {
        Route::get('/', 'getUserData')->middleware('auth:sanctum');
        Route::post('/{crypto}', 'store')->middleware('auth:sanctum');
        Route::delete('/{investment}', 'delete')->middleware('auth:sanctum');
    });


Route::controller(LanguageController::class)
    ->prefix('languages')
    ->name('languages.')
    ->group(function () {
        Route::get('/', 'getAll');
        Route::post('/change', 'change')->middleware('auth:sanctum');
    });

Route::controller(ForexCurrencyController::class)
    ->prefix('forex-currencies')
    ->name('forex-currencies.')
    ->group(function () {
        Route::get('/', 'getAll');
        Route::post('/change', 'change')->middleware('auth:sanctum');
    });


Route::controller(StatisticController::class)
    ->prefix('statistics')
    ->name('statistics.')
    ->group(function () {
        Route::get('/investments', 'investments')->middleware('auth:sanctum');
        Route::get('/dashboard', 'dashboard')->middleware('auth:sanctum');
    });
