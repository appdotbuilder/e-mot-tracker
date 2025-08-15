<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TrackingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public tracking interface
Route::get('/', [TrackingController::class, 'index'])->name('home');
Route::post('/track', [TrackingController::class, 'store'])->name('tracking.search');

Route::middleware(['auth', 'verified'])->group(function () {
    // Admin dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Document management
    Route::resource('documents', DocumentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
