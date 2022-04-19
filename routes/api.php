<?php

namespace App\Http\Controllers;
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


Route::group(['prefix' => 'users', 'middleware' => 'CORS'], function ($router) {
    Route::post('/register', [UserController::class, 'register'])->name('register.user');
    Route::post('/login', [UserController::class, 'login'])->name('login.user');
    Route::get('/view-profile', [UserController::class, 'viewProfile'])->name('profile.user');
    Route::get('/logout', [UserController::class, 'logout'])->name('logout.user');
});


Route::group(['prefix' => 'posts', 'middleware' => 'CORS'], function ($router) {
    Route::get('/all', [PostController::class, 'apiIndex'])->name('apiIndex.posts');
    Route::post('/create', [PostController::class, 'store'])->name('store.posts');
    // Route::post('/register', [UserController::class, 'register'])->name('register.user');
    // Route::post('/login', [UserController::class, 'login'])->name('login.user');
    // Route::get('/view-profile', [UserController::class, 'viewProfile'])->name('profile.user');
    // Route::get('/logout', [UserController::class, 'logout'])->name('logout.user');
});


// Route::middleware("auth:api")->group(function(){
//     Route::get("posts", [PostController::class, "apiIndex"])->name("api.posts.index");

//     Route::get("comments", [CommentController::class, "apiIndex"])->name("api.comments.index");
    
//     Route::post("posts", [PostController::class, "apiStore"])->name("api.posts.store");
    
//     Route::post("comments", [CommentController::class, "apiStore"])->name("api.comments.store");

//     Route::get("currentUser", [UserController::class, "currentUser"])->name("api.posts.currentUser");
// });

// Route::middleware(["auth"])->group(function() {

    
// });

// Route::get("posts", [PostController::class, "apiIndex"])->name("api.posts.index");

// Route::get("currentUser", [UserController::class, "currentUser"])->name("api.posts.currentUser");


// Route::middleware(["auth"])->group(function() {
//     Route::get("currentUser", [UserController::class, "currentUser"])->name("api.posts.currentUser");
   
//     Route::get("posts", [PostController::class, "apiIndex"])->name("api.posts.index");
    
//     // Route::get("/comments", [CommentController::class, "index"]);

//     // Route::get("/posts", [PostController::class, "index"]);

// });
