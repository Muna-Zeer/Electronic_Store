<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected  $fillable=['id','user_id','product_id','product_Qty'];
    protected $with = ['product'];
    public function product()
    {
        return $this->belongsTo(Item::class, 'product_id', 'id');
    }
}
