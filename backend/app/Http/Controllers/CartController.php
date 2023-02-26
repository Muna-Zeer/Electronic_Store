<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Item;
use Illuminate\Support\Facades\Validator;
class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        if(auth('sanctum')->check()){
            $user_id=auth('sanctum')->user()->id;
            $cart=Cart::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cart,
            ]);
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Unauthorized access to view cartItems',
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
     if(auth('sanctum')->check()){
        $user_id=auth('sanctum')->user()->id;
        $product=$request->product_id;
        $product_Qty=$request->product_Qty;
        $product_checkout=Item::where('id',$product_id)->first();

        if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
        {
            return response()->json([
          'status'=>409,
          'message'=>$product_checkout->product_name.'already exists',      
            ]);
        }
        else{

            $cartRecord=new Cart;
            $cartRecord->product_id=$product_id;
            $cartRecord->product_Qty=$product_Qty;
            $cartRecord->save();
            return response()->json([
             'status'=>201,
             'message'=>'success added product into cart',
             'data'=>$cartRecord,
            ]);

                }
     }
     else{
        return response()->json([
            'status'=>401,
            'message'=>'Unauthorized access to product category login again to add to cart'
        ]);

     }






    }


    public function updateQty($cart_id,$scope){
        // if(auth('sanctum')->check()){
            $user_id=auth('sanctum')->user()->id;
            if(!$user_id){
                return response()->json([
                    'status'=>401,
                    'message'=>'Unauthorized access to product category please login again ...',
                ],401);
            }
            $cartItem=Cart::where('id',$cart_id)->where('user_id',$user_id->id)->first();
            if(!$cartItem){
                return response()->json([
                    'status'=>404,
                    'message'=>'cart item not found',
                ],404);
            }
            if($scope==='inc'){
                $cartItem->product_Qty++;
            }
        else if($scope==='dec'){
            $cartItem->product_Qty--;
        }
        
    $cartItem->save();

    return response()->json([
        'status' => 200,
        'message' => 'Quantity updated',
    ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if(auth('sanctum')->check()){
            $user_id=auth('sanctum')->user()->id;
            $cart=Cart::where('id',$id)->where('user_id',$$user_id)->first();
           if($cart){
            $cart->delete();
        return response()->json([
            'status'=>200,
            'message'=>'item deleted successfully from cart',
        ]);   
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'item not found in cart',
            ]);
        }
        }
        else{
            return response()->json([
                'status'=>401,
                'message'=>'Unauthorized request please try again login',
            ]);
        }
    }

    public function checkout(Request $request)
{
if(auth('sanctum')->check()){
    $validator=Validator::make($request->all(),[
        'firstName'=>'required|max:191',
        'lastName'=>'required|max:191',
        'phone'=>'required|max:191',
        'email'=>'required|email|max:191',
        'address'=>'required|max:255',
        'city'=>'required|max:191',
        'state'=>'required|max:191',
        'zipCode'=>'required|max:191',
    ]);
    if($validator->fails()){
        return response()->json([
            'status'=>422,
            'errors'=>$validator->errors(),
        ]);

    }

    else{
        return response()->json([
            'status'=>200,
            'message'=>$request->firstName,
        ]);
    }
}
else
{
    return response()->json([
        'status'=> 401,
        'message'=> 'Login to continue',
    ]);
}
}

}
