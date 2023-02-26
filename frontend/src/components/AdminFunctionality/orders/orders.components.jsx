/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let isRendering = true;
    document.title = "Orders";
    axios.get(`http://127.0.0.1:8000/api/admin/orders`).then((res) => {
      if (isRendering) {
        if (res.data.status === 200) {
          setOrders(res.data.orders);
          setLoading(false);
        }
      }
    });
    return () => {
      isRendering = false;
    };
  }, []);
  var orderList = "";

  if (loading) {
    return <h4>order list loading ...</h4>;
  } else {
    orderList = orders.map((order)=>{
      <tr key={order.id}>
        <td>{order.user_id}</td>
        <td>{order.firstName}</td>
        <td>{order.lastName}</td>
        <td>{order.phone}</td>
        <td>{order.email}</td>
        <td>{order.city}</td>
        <td>
          <Link
            to={`view-order/${order.id}`}
            className="btn btn-success btn-sm"
          >
            View
          </Link>
        </td>
      </tr>;
    });
  }

  return (
  <div>
 <div className="container px-4 mt-3">
        <div className="card">
            <div className="card-header">
                <h4>Orders  </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>lastName</th>
                                <th>lastName</th>
                                <th>firstName</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>city</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>

  </div>)
  ;
};
export default Order;
