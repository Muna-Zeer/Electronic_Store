<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    
    protected $table='items';

    protected $fillable=['id','category_id','product_name','description','brand','selling_price','original_price','Qty','image','featured'];
}
