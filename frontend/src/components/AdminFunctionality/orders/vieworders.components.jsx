import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
// import "./viewproduct.css";

const ViewOrder = () => {
  const { id } = useParams();
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
          setOrder(res.data.item);
          console.log("res.data.item", res.data.item);
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       firstName: order.firstName,
//       lastName: order.lastName,
//       email: order.email,
//       phone: order.phone,
//       address: order.address,
//       city: order.city,
//       state: order.state,
//       zipCode: order.zipCode,
//     };
//     console.log("data is", data);
//     axios.post(`http://127.0.0.1:8000/api/add-to-cart`, data).then((res) => {
//       if (res.data.status === 200) {
//         swal("success", res.data.message, "success");

//         console.log("data inside post ", data);
//         setOrder({
//           firstName: "",
//           lastName: "",
//           email: "",
//           address: "",
//           city: "",
//           state: "",
//           zipCode: "",
//           error_List: [],
//         });
//         console.log("data inside post", data);
//       } else if (res.data.status === 409) {
//         //already added to cart
//         swal("success", res.data.message, "success");
//       } else if (res.data.status === 401) {
//         //Unauthenticated
//         swal("error", res.data.status, "error");
//       } else if (res.data.status === 404) {
//         //not found
//         swal("warning", res.data.message, "warning");
//       } else if (res.data.status === 422) {
//         setOrder({ ...order, error_list: res.data.validate_err });
//       }
//     });
//   };

  return (
    <div className="container my-5">
      {order && (
        <div className="row">
          <div className="col-md-5">
            {/* <img
              src={`http://localhost:8000/storage/${product.image}`}
              alt={product.product_name}
              className="img-fluid"
            /> */}
            <p className="viewproduct">
              <strong>First Name:</strong> {order.firstName}
            </p>
          </div>
          <div className="col-md-7">
            <p className="viewproduct">
              <strong>Last Name:</strong> {order.lastName}
            </p>{" "}
            <p className="viewproduct">
              {/* <p>product_Id:{product.id}</p> */}
              <strong>email:</strong> {order.email}
            </p>
            <p className="viewproduct">
              <strong>phone:</strong> {order.phone}
            </p>
            <p className="viewproduct">
              <strong>Address:</strong> {order.address}
            </p>
            <p className="viewproduct">
              <strong>City:</strong> {order.city}
            </p>
            <p className="viewproduct">
              <strong>state:</strong> {order.state}
            </p>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
