<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */



    public function index()
    {
        //
        $product= DB::table('items')
        ->join('categories', 'items.category_id', '=', 'categories.id')
        ->select('items.*', 'categories.name as category_name')
        ->paginate(6);
        return response()->json([
            'status' => 200,
            'message' => 'success',
            'products' => $product,
        ]);
    }

    public function viewproduct($id)
{
    $item = DB::table('items')
                ->join('categories', 'items.category_id', '=', 'categories.id')
                ->select('items.*', 'categories.name')
                ->where('items.id', '=', $id)
                ->first();

    return response()->json([
        'item' => $item
    ]);
}

    public function viewItems()
    {
        $product = Item::paginate(8);
        return response()->json([
            'status' => 200,
            'message' => 'success',
            'products' => $product,
        ]);
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
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',

            'description' => 'required|max:500',

            'product_name' => 'required:191',
            'brand' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'Qty' => 'required|max:4',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);


        if ($validator->fails()) {
            // return response()->json([
            //     'status'=>422,
            //     'errors'=>$validator->errors(),
            // ]);
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        } else {
            $product = new Item();
            $product->category_id = $request->input('category_id');


            $product->description = $request->input('description');

            $product->product_name = $request->input('product_name');
            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->Qty = $request->input('Qty');
            $product->image = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                Log::info('Image file received:', [$image]);
                $imageName = $image->getClientOriginalName();
                $image->storeAs('public/uploads/product', $imageName);
                $product->image = 'uploads/product/' . $imageName;
            }

            $product->featured = $request->input('featured');

            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'product Added Successfully',
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
        $product = Item::find($id);
        if ($product) {
            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no,product Found'
            ]);
        }
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

        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',

           

            'product_name' => 'sometimes|max:191',
            'brand' => 'sometimes|max:20',
            'selling_price' => 'sometimes|max:20',
            'original_price' => 'sometimes|max:20',
            'Qty' => 'sometimes|max:4',
            // 'image' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
            
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {
            $product = Item::find($id);

            if ($product) {
                $product->category_id = $request->input('category_id');

                $product->description = $request->input('description');
                $product->product_name = $request->input('product_name');
                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->Qty = $request->input('Qty');
                $product->image = null;

                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    Log::info('Image file received:', [$image]);
                    $imageName = $image->getClientOriginalName();
                    $image->storeAs('public/uploads/product', $imageName);
                    $product->image = 'uploads/product/' . $imageName;
                }
                $product->featured = $request->input('featured');
                $product->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'product updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'product failed update'
                ]);
            }
        }
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
        $product = Item::find($id);
        if ($product) {
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Successfully deleted the specified resource product.'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No product specified found for the product' . $id
            ]);
        }
    }
}
