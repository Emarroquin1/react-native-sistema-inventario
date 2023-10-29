<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriaController extends Controller
{
    public function selectActiveCategorias()
    {
        // Realiza una consulta para obtener todas las categorías activas
        $categorias = Categoria::where('activo', true)->get();
    
        if ($categorias->count() > 0) {
            // Si hay categorías activas registradas, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 200,
                'data' => $categorias
            ], 200);
        } else {
            // Si no hay categorías activas registradas, devuelve una respuesta en formato JSON
            return response()->json([
                'code' => 404,
                'data' => 'No hay categorías activas registradas'
            ], 404);
        }
    }
    

    public function storeCategoria(Request $request)
    {
        // Valida los datos recibidos en la petición
        $validacion = Validator::make($request->all(), [
            'nombre_categoria' => 'required',
            'descripcion' => 'required',
            'activo' => 'required|boolean',
        ]);
        if ($validacion->fails()) {
            // Si hay errores, devuelve el mensaje de error
            return response()->json([
                'code' => 400,
                'data' => $validacion->messages()
            ], 400);
        } else {
            // Si no hay errores, inserta la categoría
            $categoria = Categoria::create($request->all());

            // Devuelve un mensaje en formato JSON
            return response()->json([
                'code' => 200,
                'data' => 'Categoría insertada'
            ], 200);
        }
    }

    public function updateCategoria(Request $request, $id)
    {
        // Valida los datos recibidos en la petición
        $validacion = Validator::make($request->all(), [
            'nombre_categoria' => 'required',
            'descripcion' => 'required',
            'activo' => 'required|boolean',
        ]);
        if ($validacion->fails()) {
            // Si hay errores, devuelve el mensaje de error
            return response()->json([
                'code' => 400,
                'data' => $validacion->messages()
            ], 400);
        } else {
            // Busca la categoría por ID
            $categoria = Categoria::find($id);
            if ($categoria) {
                // Si la categoría existe, actualiza los datos
                $categoria->update($request->all());

                // Devuelve una respuesta en formato JSON
                return response()->json([
                    'code' => 200,
                    'data' => 'Categoría actualizada'
                ], 200);
            } else {
                // Si la categoría no existe, devuelve una respuesta en formato JSON
                return response()->json([
                    'code' => 404,
                    'data' => 'Categoría no encontrada'
                ], 404);
            }
        }
    }

    public function deleteCategoria($id)
    {
        // Busca la categoría por su ID
        $categoria = Categoria::find($id);
    
        if ($categoria) {
            // Actualiza el campo 'activo' a false en lugar de eliminar el registro
            $categoria->update([
                'activo' => false
            ]);
    
            // Retorna una respuesta en formato JSON
            return response()->json([
                'code' => 200,
                'data' => 'Categoría eliminada'
            ], 200);
        } else {
            // Si no se encuentra la categoría, retorna un mensaje de error
            return response()->json([
                'code' => 404,
                'data' => 'Categoría no encontrada'
            ], 404);
        }
    }
    

    public function findCategoria($id)
    {
        // Busca la categoría por ID
        $categoria = Categoria::find($id);
        if ($categoria) {
            // Si la categoría existe, devuelve la información en formato JSON
            return response()->json([
                'code' => 200,
                'data' => $categoria
            ], 200);
        } else {
            // Si la categoría no existe, devuelve un mensaje en formato JSON
            return response()->json([
                'code' => 404,
                'data' => 'Categoría no encontrada'
            ], 404);
        }
    }
}
