
import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import swal from 'sweetalert';
import {  useNavigate } from "react-router-dom";
const Register=()=>{
    const navigate=useNavigate();
    const[registerInput,setRegisterInput]=useState({
        name:'',
        email:'',
        password:'',
        error_list:[],
    });

    const handleInput=(e)=>{
        e.persist();
        setRegisterInput({...registerInput,[e.target.name]:e.target.value});
    }
    const submitRegister=(e)=>{
e.preventDefault();
const data={
    name:registerInput.name,
    email:registerInput.email,
    password:registerInput.password,
}
 

axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post(`/api/register`, data).then(res => { 
        console.log('axios',axios);

        console.log('error of data',data);
        if(res.data.status === 200)
        {
           

            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            swal("Success",res.data.message,"success");
            navigate('/');
        }
        else
        {
            setRegisterInput({...registerInput, error_list: res.data.validation_errors});
        }
    });
});
  

}

    return (
        <div>
 <div className="container py-5">
                <div className="row justify-content-center " style={{marginTop:'20px' ,marginBottom:'20px'}}>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="Register-card-header">
                                <h4>Register</h4>
                            </div>
                            <div className=" Register-card-body">
                                <form onSubmit={submitRegister}>
                                    <div className="register-form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control"  />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="register-form-group mb-3">
                                        <label>Email ID</label>
                                        <input type="text" name="email" onChange={handleInput} value={registerInput.email} className="form-control"  />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className=" register-form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control"  />
                                        <span>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="register-form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Register;