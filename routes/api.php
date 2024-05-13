<?php


use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RequestManageController;

Route::get('/products',[ProductController::class,'index']);
Route::post('/send-wp-message/single-product',[ProductController::class,'sendWpMessageSingleProduct']);
Route::post('/send-wp-message/cart-product',[ProductController::class,'sendWpMessageCartProduct']);

Route::get('/all-products',[ProductController::class,'getAllProducts']);

Route::any('/v1/check-mail-verify', [RequestManageController::class, 'index']);
Route::any('/v1/check-mail-verification', [RequestManageController::class, 'index'])->middleware('checkVerifyMail');