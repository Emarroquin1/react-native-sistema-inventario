<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'Categorias';

    // Columnas de la tabla
    protected $fillable = [
        'nombre_categoria',
        'descripcion',
        'activo',
    ];

    // Clave primaria personalizada
    protected $primaryKey = 'categoriasID';

    // Si no deseas que Eloquent gestione automáticamente las columnas "created_at" y "updated_at"
    public $timestamps = false;
}
