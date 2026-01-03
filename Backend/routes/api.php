<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlgorithmController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/algorithms', [AlgorithmController::class, 'index']);
    Route::post('/algorithms', [AlgorithmController::class, 'store']);
    Route::get('/algorithms/{id}', [AlgorithmController::class, 'show']);
    Route::put('/algorithms/{id}', [AlgorithmController::class, 'update']);
    Route::delete('/algorithms/{id}', [AlgorithmController::class, 'destroy']);
});
