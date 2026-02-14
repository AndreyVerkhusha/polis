<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::resource('/articles', ArticleController::class)
    ->only(['index', 'show', 'store']);

Route::post('articles/{article}/comments', [CommentController::class, 'store']);
