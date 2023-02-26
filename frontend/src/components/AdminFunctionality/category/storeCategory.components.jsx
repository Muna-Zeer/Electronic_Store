/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
// import './category.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCategory=() =>{

   
    const [categoryInput, setCategoryInput] = useState({
       
        name: '',
        description: '',
        error_list: [],
    });
    

   const handleInput=(e)=>{
    e.persist();
    setCategoryInput({...categoryInput,[e.target.name]:e.target.value});
   }
   const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
        name:categoryInput.name,
        description:categoryInput.description
    }

   


   //create new category
   axios.post(`http://127.0.0.1:8000/api/store-category`,data)
   .then(res=>{
    if(res.data.status===200){
        e.target.reset();
        swal('Successes',res.data.message,'success');
    }
    else if(res.data.status===400){
        swal('warning',res.data.message,'warning');
        setCategoryInput({...categoryInput,error_list:res.data.errors})
    }
   });}
   let display_error=[];
   if(categoryInput.error_list){
    display_error=[
    categoryInput.error_list.name,
     categoryInput.error_list.description,]
   }

   
  


    return  (
        <div >
            <div className="container-fluid px-4">
              {  display_error.map((item,index)=>{
                    return (<p className="mb-1" key={index}>{item}</p>)
                })
            }
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Category
                        <Link className="btn btn-primary btn-sm float-end" to="/admin/category">View Category</Link>
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} >

                    <div class="form-group">
                    <label>Category Type</label>
                        <input type="text" class="form-control" name="name" onChange={handleInput} value={categoryInput.name} placeholder="Category Type " required />

                    </div>  

                    <div class="form-group">
                    <label>Category Description</label>
                        <textarea class="form-control" name="description" onChange={handleInput} value={categoryInput.description} placeholder="Category description" required />

                    </div> 
                    <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>
                </div>


            </div>
            </div>
        </div>
    )
}

export default AddCategory;