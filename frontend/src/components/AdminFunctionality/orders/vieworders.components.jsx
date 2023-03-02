import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewOrder = () => {
  const { id } = useParams();
  const[product,setProduct]=useState([]);
  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    error_List: [],
  });

  const [loading, setLoading] = useState(true);

  const getviewOrders = async () => {
    let isRendering = true;
    axios.get(`http://127.0.0.1:8000/api/viewOrder/${id}`).then((res) => {
      if (isRendering) {
        if (res.status === 200) {
          setOrder(res.data.orders);
          console.log("res.data.orders", res.data.orders);
          setLoading(false);
        }
      }
  
    });
 
    return () => {
      isRendering = false;
    };
  };

  useEffect(() => {
    getviewOrders();
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };



  return (
  


<div className="container my-5">
  {order && (
    <div className="table-responsive">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td><strong>Order Information</strong></td>
            <td><strong>Contact Information</strong></td>
            <td><strong>Shipping Information</strong></td>
            <td><strong>Order Details</strong></td>
          </tr>
          <tr>
            <td className="text-left">First Name: {order.firstName}</td>
            <td className="text-left">Last Name: {order.lastName}</td>
            <td className="text-left">Address: {order.address}</td>
            <td className="text-left">Time Created: {order.created_at}</td>
          </tr>
          <tr>
            <td></td>
            <td className="text-left">Email: {order.email}</td>
            <td className="text-left">City: {order.city}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td className="text-left">Phone: {order.phone}</td>
            <td className="text-left">State: {order.state}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>


  


  );
};

export default ViewOrder;
