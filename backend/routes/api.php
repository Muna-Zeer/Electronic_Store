<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\paymentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ReviewController;
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
//authentication for users by login and register
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Route::get('getCategory', [FrontendController::class, 'category']);
// Route::get('fetchproducts/{slug}', [FrontendController::class, 'product']);
// Route::get('viewproductdetail/{category_slug}/{product_slug}', [FrontendController::class, 'viewproduct']);

Route::post('add-to-cart', [CartController::class, 'store']);
Route::get('cart', [CartController::class, 'index']);
Route::put('cart-updateQty/{cart_id}/{scope}', [CartController::class, 'updateQty']);
Route::delete('delete-cartItem/{id}', [CartController::class, 'destroy']);
//order routes
Route::post('checkOrderItem', [paymentController::class, 'checkOrderItem']);
Route::post('place-order', [paymentController::class, 'store']);

Route::get('edit-category/{id}', [categoryController::class, 'edit']);
//admin routes
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200], 200);
    });

    // Category
    Route::get('view-category', [categoryController::class, 'index']);
    Route::post('store-category', [categoryController::class, 'store']);
    Route::get('edit-category/{id}', [categoryController::class, 'edit']);
    Route::put('update-category/{id}', [categoryController::class, 'update']);
    Route::delete('delete-category/{id}', [categoryController::class, 'destroy']);
    Route::get('allCategories', [categoryController::class, 'index']);
    Route::get('/categoryType', [categoryController::class, 'categoryType']);
    // Orders
    Route::get('admin/orders', [OrderController::class, 'index']);
    Route::get('viewOrder/{id}', [OrderController::class, 'viewOrder']);

    // Products
    Route::post('store-product', [ProductController::class, 'store']);
    Route::get('view-product', [ProductController::class, 'index']);
    Route::get('viewItems', [ProductController::class, 'index']);
    Route::get('viewproduct/{id}', [ProductController::class, 'viewproduct']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::put('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'destroy']);
});

//logout 
Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

});
