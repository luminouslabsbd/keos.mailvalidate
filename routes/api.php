<?php


use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/products',[ProductController::class,'index']);
Route::post('/send-wp-message/single-product',[ProductController::class,'sendWpMessageSingleProduct']);
Route::post('/send-wp-message/cart-product',[ProductController::class,'sendWpMessageCartProduct']);
