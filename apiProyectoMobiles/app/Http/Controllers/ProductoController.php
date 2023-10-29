<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\vst_producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function selectActiveProductos()
    {
        // Realiza una consulta para obtener todos los productos activos
        $productos = Producto::where('activo', true)->get();

        if ($productos->count() > 0) {
            // Si hay productos activos registrados, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 200,
                'data' => $productos
            ], 200);
        } else {
            // Si no hay productos activos registrados, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 404,
                'data' => 'No hay productos activos registrados'
            ], 404);
        }
    }

    public function selectActiveProductosVista()
    {
        // Realiza una consulta para obtener todos los productos activos
        $productos = vst_producto::where('activo', true)->get();

        if ($productos->count() > 0) {
            // Si hay productos activos registrados, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 200,
                'data' => $productos
            ], 200);
        } else {
            // Si no hay productos activos registrados, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 404,
                'data' => 'No hay productos activos registrados'
            ], 404);
        }
    }

    public function selectActiveProveedor()
    {
        // Realiza una consulta para obtener todos los productos activos
        $proveedor = Proveedor::where('activo', true)->get();

        if ($proveedor->count() > 0) {
            // Si hay productos activos registrados, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 200,
                'data' => $proveedor
            ], 200);
        } else {
            // Si no hay productos activos registrados, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 404,
                'data' => 'No hay productos activos registrados'
            ], 404);
        }
    }



    public function storeProducto(Request $request)
    {   //dd('nombre');
        // Valida los datos recibidos en la petición
        $validacion = Validator::make($request->all(), [
            'nombre' => 'required',
            'precio_compra' => 'required',
            'precio_venta' => 'required',
            'stock' => 'required',
            'stock_min' => 'required',
            'ProveedoresID' => 'required',
            'categoriasID' => 'required',
            'activo' => 'required',
        ]);

        if ($validacion->fails()) {
            // Si hay errores, devuelve el mensaje de error
            return response()->json([
                'code' => 400,
                'data' => $validacion->messages()
            ], 400);
        } else {
            // Si no hay errores, inserta el producto
            $producto = Producto::create($request->all());

            // Devuelve un mensaje en formato JSON
            return response()->json([
                'code' => 200,
                'data' => 'Producto insertado'
            ], 200);
        }
    }

    public function updateProducto(Request $request, $id)
    {
        // Valida los datos recibidos en la petición
        $validacion = Validator::make($request->all(), [
            'nombre' => 'required',
            'precio_compra' => 'required',
            'precio_venta' => 'required',
            'stock' => 'required',
            'stock_min' => 'required',
            'ProveedoresID' => 'required',
            'categoriasID' => 'required',
            'activo' => 'required',
        ]);

        if ($validacion->fails()) {
            // Si hay errores, devuelve el mensaje de error
            return response()->json([
                'code' => 400,
                'data' => $validacion->messages()
            ], 400);
        } else {
            // Busca el producto por ID
            $producto = Producto::find($id);
            if ($producto) {
                // Si el producto existe, actualiza los datos
                $producto->update($request->all());

                // Devuelve una respuesta en formato JSON
                return response()->json([
                    'code' => 200,
                    'data' => 'Producto actualizado'
                ], 200);
            } else {
                // Si el producto no existe, devuelve una respuesta en formato JSON
                return response()->json([
                    'code' => 404,
                    'data' => 'Producto no encontrado'
                ], 404);
            }
        }
    }


    public function deleteProducto($id)
    {
        // Busca el producto por su ID
        $producto = Producto::find($id);

        if ($producto) {
            // Actualiza el campo 'activo' a false en lugar de eliminar el registro
            $producto->update([
                'activo' => false
            ]);

            // Retorna una respuesta en formato JSON
            return response()->json([
                'code' => 200,
                'data' => 'Producto eliminado'
            ], 200);
        } else {
            // Si no se encuentra el producto, retorna un mensaje de error
            return response()->json([
                'code' => 404,
                'data' => 'Producto no encontrado'
            ], 404);
        }
    }



    public function findProducto($id)
    {
        // Busca el producto por ID
        $producto = Producto::find($id);
        if ($producto) {
            // Si el producto existe, devuelve la información en formato JSON
            return response()->json([
                'code' => 200,
                'data' => $producto
            ], 200);
        } else {
            // Si el producto no existe, devuelve un mensaje en formato JSON
            return response()->json([
                'code' => 404,
                'data' => 'Producto no encontrado'
            ], 404);
        }
    }
}
