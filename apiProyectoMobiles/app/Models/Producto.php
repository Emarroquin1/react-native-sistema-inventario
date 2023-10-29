<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'Productos';

    // Columnas de la tabla
    protected $fillable = [
        'nombre',
        'precio_compra',
        'precio_venta',
        'stock',
        'stock_min',
        'ProveedoresID',
        'categoriasID',
        'activo',
    ];

    // Clave primaria personalizada
    protected $primaryKey = 'productosID';

    // Si no deseas que Eloquent gestione automáticamente las columnas "created_at" y "updated_at"
    public $timestamps = false;

   
}
