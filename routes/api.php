<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('all', [\App\Http\Controllers\TaskController::class, 'index']);
    Route::post('create', [\App\Http\Controllers\TaskController::class, 'store']);
    Route::put('update', [\App\Http\Controllers\TaskController::class, 'update']);
    Route::delete('delete', [\App\Http\Controllers\TaskController::class, 'destroy']);
});

