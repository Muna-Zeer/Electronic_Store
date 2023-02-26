<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class paymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

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
            'message'=>$validator->errors()->first(),
        ]);
    }

    else{
        $user_id=auth('sanctum')->user()->id;
        $order=new Order;
        $order->user_id = $user_id;
        $order->firstName = $request->input('firstName');
        $order->lastName = $request->input('lastName');
        $order->phone = $request->input('phone');
        $order->email = $request->input('email');
        $order->address = $request->input('address');
        $order->city = $request->input('city');
        $order->state = $request->input('state');
        $order->zipCode = $request->input('zipCode');
        $order->payment_mode = $request->input('payment_mode');
        $order->payment_id = $request->input('payment_id');
        $order->save();

        //cart
        $cart=Cart::where('user_id',$user_id)->get();
        $orderItems=[];
        foreach($cart as $item){
            $orderitems[] = [
                'product_id'=>$item->product_id,
                'qty'=>$item->product_qty,
                'price'=>$item->product->selling_price,
            ];

            $item->product->update([
                'qty'=>$item->product->qty - $item->product_qty
            ]);
        }

        $order->orderItems()->createMany($orderItems);
        Cart::destroy($cart);
        return response()->json([
            'status'=>200,
            'message'=>'order added successfully ',
        ]);

    }
}
else{
    return response()->json([
    'status'=>401,
    'message'=>'Unauthorized request to order item please try again',
    ]);
}
        
    }

    //check if order exists and if it does then update it and return status

    
    public function  checkOrderItem(Request $request ){
        if(auth('sanctum')->check())
        {
            $validator = Validator::make($request->all(), [
                'firstName' => 'required|max:191',
                'lastName'=>'required|max:191',
                'phone'=>'required|max:191',
                'email'=>'required|max:191',
                'address'=>'required|max:191',
                'city'=>'required|max:191',
                'state'=>'required|max:191',
                'zipcode'=>'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>200,
                    'message'=>'Form Validated Successfully',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=> 401,
                'message'=> 'Login to Continue',
            ]);
        }
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
    }
}
