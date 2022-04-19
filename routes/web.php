<?php

namespace App\Http\Controllers;
// use App\FirebaseStorage;

// app()->singleton("firebaseStorage", function($app)  {
//     return (new FirebaseStorage(env("FIREBASE_CREDENTIALS"))); 
// });

use Illuminate\Support\Facades\Route;

Route::view("/{path?}", "react")
    ->where("path", ".*")
    ->name("react");

