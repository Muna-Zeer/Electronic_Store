<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
class categoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $category=Category::paginate(6);
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);

    }


 public function categoryType(){
    $categories = DB::select('SELECT id, name FROM categories
    ');
     return response()->json([
            'status'=>200,
            'category'=>$categories,
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
        $validator=Validator::make($request->all(),[
            'name'=>'required|max:191',
            // 'description'=>'required|max:191',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validator->errors(),
            ]);

        }
        else{
            $category=new Category;
            $category->name=$request->input('name');
            $category->description=$request->input('description');
            $category->save();
            return response()->json([
                'status'=>200,
                'message'=>'category added successfully'
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
        $category=Category::find($id);
        if($category){
            return response()->json([
                'status'=>200,
                'category'=>$category,
                'message'=>"successfully edited ",
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'there is no category with id'.$id,
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
        $validator=Validator::make($request->all(),[
            'name'=>'required|max:191',
            'description'=>'required|max:255',
        ]);
         if($validator->fails()){
            return response()->json([
                'status'=>422,
                'message'=>$validator->message(),
            ]);
         }
          
       else{
        $category=Category::find($id);
        if($category){
            $category->name=$request->input('name');
            $category->description=$request->input('description');
            $category->save();
            return response()->json([
                'status'=>200,
                'message'=>'successfully updated category',
            ]);
        }
         else{
            return response()->json([
                'status'=>404,
                'message'=>'category not found or invalid',
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
        $category=Category::find($id);
        if($category){
            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Successfully deleted the specified resource category.'
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'No category specified found for the category'.$id
            ]);
        }
    }
}
