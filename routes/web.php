<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get("/posts", [PostController::class, "index"]);

Route::middleware(["auth"])->group(function() {
    Route::view("/admin", "admin")->name("admin");

    
    Route::get("/comments", [CommentController::class, "index"]);

    Route::get("/posts", [PostController::class, "index"]);

});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

// require __DIR__.'/auth.php';
