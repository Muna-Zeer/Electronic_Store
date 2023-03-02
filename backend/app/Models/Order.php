<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table='orders';
    protected $fillable=['id','user_id','firstName','lastName','phone','email','address','city','state','zipCode','payment_id','payment_mode','result'];
    public function orderitems()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
}
