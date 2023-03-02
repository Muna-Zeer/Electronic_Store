import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let totalCart = 0;
  let isMounted = true;
  if (!localStorage.getItem("auth_token")) {
    navigate("/");
    swal("warning", "login to cart page", "error");
  }

  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      axios.get("http://127.0.0.1:8000/api/cart").then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setCart(res.data.cart);
            console.log('cart',cart);
            setLoading(false);
          } else if (res.data.status === 401) {
            navigate("/");
            swal("warning", res.data.message, "error");
          }
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [navigate]);

  //increment the qty of item
  const handleIncrement_Qty = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty + (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateQuantity(cart_id, "inc");
  };

  //decrement the quantity of item
  const handleDecrement = (cart_id) => {
    setCart((cart) => {
      return cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : { ...item }
      );
    });
    updateQuantity(cart_id, "dec");
  };
  //update quantity and the item if require that
  const updateQuantity = (cart_id, scope) => {
    axios
      .put(`http://127.0.0.1:8000/api/cart-updateQty/${cart_id}/${scope}`)
      .then((res) => {
        if (res.data.status === 200) {
          swal("success", res.data.message);
          // console.log('res.data.cart.product_qty',res.data.cart.product_qty);
          // console.log('res.data.cart.product_Qty',res.data.cart.product_Qty);
          console.log("res.data.cartItem", res.data.cartItem);
          console.log("res.data", res.data);
          // setCart(cart.cartItem);
        } else if (res.data.status === 404) {
          swal("warning", res.data.message);
        } else if (res.data.status === 400) {
          swal("warning", res.data.message, "error");
        }
      });
  };

  //delete item from cart
  const deleteItem = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/delete-cartItem/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        // getAllProduct();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };
  // if (loading) {
  //   return <p>loading cart ....</p>;
  // }
  var viewCartHtml = "";

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => {
                totalCart += item.product.selling_price * item.product_qty;
                return (
                  <tr key={idx}>
                    <td width="25%">
                      <img
                        src={`http://localhost:8000/storage/${item.product.image}`}
                        alt={item.product.name}
                        style={{
                          width: "80px",
                          height: "80px",
                        }}
                      />
                    </td>
                    <td>{item.product.product_name}</td>
                    <td width="10%" className="text-center">
                      {item.product.selling_price}
                    </td>
                    <td width="25%">
                      <div className="input-group">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          className="input-group-text"
                        >
                          -
                        </button>
                        <div className="form-control text-center">
                          {item.product_qty}{" "}
                          {/* Updated from item.product_qty */}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleIncrement_Qty(item.id)}
                          className="input-group-text"
                        >
                          +
                        </button>
                        <h6 style={{ color: "red" }}>
                          total Quantity:[{item.product.Qty}]
                        </h6>
                      </div>
                    </td>
                    <td width="15%" className="text-center">
                      {item.product.selling_price * item.product_qty}
                    </td>
                    <td width="10%">
                      <button
                        type="button"
                        onClick={(e) => deleteItem(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div className="card card-body mt-3">
              <h4>
                Sub Total:
                <span className="float-end">{totalCart}</span>
              </h4>
              <h4>
                Grand Total:
                <span className="float-end">{totalCart}</span>
              </h4>
              <hr />
              <Link to="/checkout" className="btn btn-primary">
                {" "}
                Checkout{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //  else {
  //   cart_HTML = (
  //     <div>
  //       <div className="card card-body py-5 text-center shadow-sm">
  //         <h4>Your Shopping Cart is Empty</h4>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Cart</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{cart_HTML}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
