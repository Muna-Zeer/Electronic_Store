import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselFade from './components/header/header.components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import About from './Pages/About/about.pages';
import Contact from './Pages/Contact/contact.pages';
import Product from './Pages/Product/product.pages';
import Category from './Pages/Category/category.pages';

import Home from './Pages/Home/home.pages';
import Login from './Pages/Login/login.pages';
import Footer from './components/Footer/footer.components';
import Register from './Pages/Login/register.pages';
import Adminpanel from './admin/Adminpanel/adminpanel.admin';
import Dashboard from './admin/Dashboard/dashboard.admin';
import Profile from './admin/profile/profile.admin';
import AddCategory from './components/AdminFunctionality/category/storeCategory.components';
import ViewCategory from './components/AdminFunctionality/category/view-category.components';
import EditCategories from './components/AdminFunctionality/category/edit-category.components';
import Addproduct from './components/AdminFunctionality/product/addproduct.components';
import Viewproduct from './components/AdminFunctionality/product/view-product.components';
import Editproduct from './components/AdminFunctionality/product/editproduct.components';
import Order from './components/AdminFunctionality/orders/orders.components';
import ViewProduct from './Pages/Product/viewproduct.pages';
import Cart from './Pages/cart/cart.pages';
import Checkout from './Pages/checkout/checkout.pages';
import ViewOrder from './components/AdminFunctionality/orders/vieworders.components';


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.baseURL = "http://127.0.0.1:8000"; //Before sending get request
axios.defaults.withCredentials = true;
function App() {
  // const [orders, setOrders] = useState([])
  // useEffect(()=>{
  //   async function getAllOrder(){
  //     try {
  //       const orders = await axios.get("http://127.0.0.1:8000/api/orders")
  //       console.log(orders.data)
  //       setOrders(orders.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getAllOrder()
  // }, [])
  

  axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });
  return (
    <div className="App">
     

 
<BrowserRouter>
        <CarouselFade />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Product" element={<Product />} />
          {/* <Route path="/Categories" element={<Category />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Adminpanel />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/add-category" element={<AddCategory/>} />
          <Route path="/admin/view-category" element={<ViewCategory />} />
          <Route path="/admin/category/edit-category/:id" element={<EditCategories />} />
          <Route path="/admin/add-product" element={<Addproduct/>} />
          <Route path="/admin/view-product" element={<Viewproduct />} />
          <Route path="/admin/view-product/edit-product/:id" element={<Editproduct />} />
          <Route path="/admin/orders" element={<Order/>} />
          <Route path="/admin/category" element={<ViewCategory/>} />
          <Route path="/Product/view-product/:id" element={<ViewProduct/>} />
          <Route path="/addCart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/admin/viewOrders" element={<Order/>} />
          <Route path="/admin/view-orders/:id" element={<ViewOrder/>} />
        </Routes>
    
     <Footer/>
      </BrowserRouter>


     
    </div>
  );
}

export default App;
