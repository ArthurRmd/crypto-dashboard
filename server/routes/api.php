<?php

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


