<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;

//API PARA CATEGORIAS
Route::delete('/categoria/delete/{id}', [CategoriaController::class, 'deleteCategoria']);
Route::get('/categoria/select', [CategoriaController::class, 'selectActiveCategorias']);
Route::post('/categoria/store', [CategoriaController::class, 'storeCategoria']);
Route::put('/categoria/update/{id}', [CategoriaController::class, 'updateCategoria']);
Route::get('/categoria/find/{id}', [CategoriaController::class, 'findCategoria']);

//API PARA PRODUCTOS
Route::get('/producto/select', [ProductoController::class, 'selectActiveProductos']);
Route::get('/productoVista/select', [ProductoController::class, 'selectActiveProductosVista']);
Route::post('/producto/store', [ProductoController::class, 'storeProducto']);
Route::put('/producto/update/{id}', [ProductoController::class, 'updateProducto']);
Route::get('/producto/find/{id}', [ProductoController::class, 'findProducto']);
Route::delete('/producto/delete/{id}', [ProductoController::class, 'deleteProducto']);

//API PARA PROVEEDOR
Route::get('/proveedor/select', [ProductoController::class, 'selectActiveProveedor']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
