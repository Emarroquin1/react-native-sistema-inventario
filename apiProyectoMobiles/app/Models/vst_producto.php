<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class vst_producto extends Model
{
    // Nombre de la vista
    protected $table = 'vst_producto';

    // No necesitas especificar $fillable ya que no se van a realizar operaciones de escritura en la vista.

    // Clave primaria personalizada si la vista lo requiere
    protected $primaryKey = 'productosId';

    // Si no deseas que Eloquent gestione automáticamente las columnas "created_at" y "updated_at"
    public $timestamps = false;
}
