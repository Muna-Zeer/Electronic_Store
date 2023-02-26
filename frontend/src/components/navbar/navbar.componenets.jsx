import './navbar.css'
import React from 'react';
import { Link } from "react-router-dom";
import { MagnifyingGlass } from 'phosphor-react';
import Category from '../../Pages/Category/category.pages';

const NavigationHeader = () => {
    return (
        <div className='NavigationHeader container-fluid '>
            <div className='col-sm-2 '>

                <span className="logo ">
                    <i> Electronic</i>
                    <i style={{ color: 'white' }}>Shopping</i>
                </span>
            </div>
            <nav className=' navHeader  col-sm-10'>
                <ul>
                    <li className='Home col-sm-1'>

                        <Link className="nav-link" to="/Home"> Home </Link>
                    </li>

                    <li>

                        <Link className="nav-link" to="/About" >About Us</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/Contact" > Contact Us</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/Product" > Products</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/Categories" ><Category/> </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/login" > Login</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/register" > Register</Link>
                    </li>
                    
                    <li className=' search col-sm-2'><MagnifyingGlass size={20} color={'#F0EEED '} /></li>

                    <input type='text' name='search' placeholder='search'></input>

                </ul>
            </nav>
        </div>
    );
}
export default NavigationHeader;