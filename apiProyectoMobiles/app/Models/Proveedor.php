<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'Proveedores';

    // Columnas de la tabla
    protected $fillable = [
        'nombre',
        'contacto',
        'direccion',
        'activo',
    ];

    // Clave primaria personalizada
    protected $primaryKey = 'ProveedoresID';

    // Si no deseas que Eloquent gestione automáticamente las columnas "created_at" y "updated_at"
    public $timestamps = false;
}
