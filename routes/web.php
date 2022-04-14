<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

Route::view("/{path?}", "react")
    ->where("path", ".*")
    ->name("react");

