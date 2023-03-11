import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import ReactDOM from "react-dom";

const Checkout = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("auth_token")) {
    navigate("/");
    swal("Warning", "Login to goto Cart Page", "error");
  }
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  var totalPrice = 0;

  const [checkoutInput, setCheckoutInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    error_List: [],
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios.get("http://127.0.0.1:8000/api/cart").then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          console.log("res.data.cart", res.data.cart);
          setCart(res.data.cart);
          setLoading(false);
        } else if (res.data.status === 401) {
          navigate("/");
          swal("warning", res.data.message, "error");
        }
      }
      return () => {
        isMounted = false;
      };
    });
  }, [navigate]);
  const handleInput = (e) => {
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  let orderInput = {
    firstName: checkoutInput.firstName,
    lastName: checkoutInput.lastName,
    email: checkoutInput.email,
    phone: checkoutInput.phone,
    address: checkoutInput.address,
    city: checkoutInput.city,
    state: checkoutInput.state,
    zipCode: checkoutInput.zipCode,
    payment_mode: "Paid by PayPal",
    payment_id: "",
  };
  //   console.log('orderInput',orderInput);

  //paypal code
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  const createOrder = (data, action) => {
    return action.order.create({
      purchase_units: [
        {
          amount: {
            // currency_code:'USD',
            value: totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      orderInput.payment_id = details.id;
      console.log("details", details);
      console.log("orderInput.payment_id ", orderInput.payment_id);
      console.log("actions.order ", actions.order);

      axios
        .post(`http://127.0.0.1:8000/api/place-order`, orderInput)
        .then((res) => {
          if (res.data.status === 200) {
            swal("order placed successfully", res.data.message, "success");
            console.log(("res.data.cart", res.data.cart));
            setCheckoutInput({
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
            });
          } else if (res.data.status === 422) {
            swal("All field are mandatory", "", "error");
            setCheckoutInput({
              ...checkoutInput,
              error_list: res.data.validate_err,
            });
          }
        });
    });
  };
  //end the paypal code
  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    let data = {
      firstName: checkoutInput.firstName,
      lastName: checkoutInput.lastName,
      email: checkoutInput.email,
      phone: checkoutInput.phone,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipCode: checkoutInput.zipCode,
      payment_mode: "Paid by PayPal",
      payment_id: "",
    };
    console.log("data is", data);
    switch (payment_mode) {
      case "cod":
        axios
          .post(`http://127.0.0.1:8000/api/place-order`, data)
          .then((res) => {
            if (res.data.status === 200) {
              swal("order placed successfully", res.data.message, "success");
              console.log(",res.data.cart", res.data);
              //   setCart(res.data.cart);
              // setCheckoutInput(res.data.cart);
              setCheckoutInput({
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                city: "",
                state: "",
                zipCode: "",
              });
            } else if (res.data.status === 422) {
              swal("all filed are mandatory", "error");
            }
          });

        break;
      case "razorpay":
        axios
          .post(`http://127.0.0.1:8000/api/checkOrderItem`, data)
          .then((res) => {
            if (res.data.status === 200) {
              var options = {
                key: "rzp_test_5AEIUNtEJxBPvS",
                amount: 1 * 100,
                name: "electronic React and laravel",
                description: "Thank you for purchasing with zeer electronic",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1xwEZtCsextV_Vh5QCPt7GdN0jglJLZ6yqA&usqp=CAU",
                handler: function (response) {
                  data.payment_id = response.razorpay_payment_id;
                  axios
                    .post(`http://127.0.0.1:8000/api/place-order`, data)
                    .then((res) => {
                      if (res.data.status === 200) {
                        swal(
                          "order placed successfully",
                          res.data.message,
                          "success"
                        );
                      }
                    });
                },
                prefill: {
                  name: data.firstName + data.lastName,
                  email: data.email,
                  contact: data.phone,
                },
                theme: {
                  color: "#3399cc",
                },
              };
              var rzp = new window.Razorpay(options);
              rzp.open();
            } else if (res.data.status === 422) {
              swal("All fields are mandetory", "", "error");
            }
          });
        break;
      case "payonline":
        axios.post(`http://127.0.0.1:8000/api/place-order`).then((res) => {
          if (res.data.status === 200) {
            var myModal = new window.bootstrap.Modal(
              document.getElementById("payOnlineModal")
            );
            setCheckoutInput({
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
            });
            myModal.show();
          } else if (res.data.status === 422) {
            swal("All fields are mandetory", "", "error");
          }
        });
        break;
      default:
        break;
    }
  };

  if (loading) {
    return <p>loading .....</p>;
  }
  let checkoutHtml = "";
  if (cart.length > 0) {
    checkoutHtml = (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Basic Information</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleInput}
                        value={checkoutInput.firstName}
                        className="form-control"
                      />
                      <small className="text-danger">{error.firstName}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleInput}
                        value={checkoutInput.lastName}
                        className="form-control"
                      />
                      <small className="text-danger">{error.lastName}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Phone Number</label>
                      <input
                        type="number"
                        name="phone"
                        onChange={handleInput}
                        value={checkoutInput.phone}
                        className="form-control"
                      />
                      <small className="text-danger">{error.phone}</small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Email Address</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        value={checkoutInput.email}
                        className="form-control"
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label> Full Address</label>
                      <textarea
                        rows="3"
                        name="address"
                        onChange={handleInput}
                        value={checkoutInput.address}
                        className="form-control"
                      ></textarea>
                      <small className="text-danger">{error.address}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        onChange={handleInput}
                        value={checkoutInput.city}
                        className="form-control"
                      />
                      <small className="text-danger">{error.city}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        onChange={handleInput}
                        value={checkoutInput.state}
                        className="form-control"
                      />
                      <small className="text-danger">{error.state}</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        onChange={handleInput}
                        value={checkoutInput.zipCode}
                        className="form-control"
                      />
                      <small className="text-danger">{error.zipCode}</small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        className="btn btn-primary mx-1"
                        onClick={(e) => submitOrder(e, "cod")}
                      >
                        <Link to="/" className="btn btn-primary">
                          Place Order
                        </Link>
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-primary mx-1"
                        onClick={(e) => submitOrder(e, "razorpay")}
                      >
                        Pay by Razorpay
                      </button> */}
                      {/* <button
                        type="button"
                        className="btn btn-warning mx-1"
                        onClick={(e) => submitOrder(e, "payonline")}
                      >
                        Pay Online
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="50%">Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => {
                  totalPrice += item.product.selling_price * item.product_qty;
                  return (
                    <tr key={idx}>
                      <td>{item.product.product_name}</td>
                      <td>{item.product.selling_price}</td>
                      <td>{item.product_qty}</td>
                      <td>{item.product.selling_price * item.product_qty}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="2" className="text-end fw-bold">
                    Grand Total
                  </td>
                  <td colSpan="2" className="text-end fw-bold">
                    {totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    checkoutHtml = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm">
          <h4>Your Shopping Cart is Empty. You are in Checkout Page.</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        class="modal fade"
        id="payOnlineModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Online Payment Mode
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <hr />
              <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Home / Checkout</h6>
        </div>
      </div>

      <div className="py-4">
        <div className="container">{checkoutHtml}</div>
      </div>
    </div>
  );
};
export default Checkout;
