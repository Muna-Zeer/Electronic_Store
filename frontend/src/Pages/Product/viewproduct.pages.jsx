import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "./viewproduct.css";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_id: "",
    category_id: "",
    product_name: "",
    description: "",
    selling_price: "",
    original_price: "",
    user_Qty: "",
    Qty: "",
    image: "",
    error_List: [],
  });
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const getviewproducts = async () => {
    let isRendering = true;
    axios.get(`http://127.0.0.1:8000/api/viewproduct/${id}`).then((res) => {
      if (isRendering) {
        if (res.status === 200) {
          setProduct(res.data.item);
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
    getviewproducts();
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      user_Qty: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      product_id: product.id,
      category_id: product.category_id,
      product_name: product.product_name,
      description: product.description,
      selling_price: product.selling_price,
      original_price: product.original_price,
      Qty: product.Qty,
      user_Qty: product.user_Qty,
      image: product.image,
    };
    console.log("data is", data);
    axios.post(`http://127.0.0.1:8000/api/add-to-cart`, data).then((res) => {
      if (res.data.status === 200) {
       

        console.log("data inside post ", data);
        setProduct({
          product_id: "",
          category_id: "",
          product_name: "",
          description: "",
          selling_price: "",
          original_price: "",
          user_Qty: "",
          Qty: "",
          image: "",
          error_List: [],
        });
        // swal("success", res.data.message, "success");
        console.log("data inside post", data);
      } else if (res.data.status === 409) {
        //already added to cart
        swal("success", res.data.message, "success");
      } else if (res.data.status === 401) {
        //Unauthenticated
        swal("error", res.data.status, "error");
      } else if (res.data.status === 404) {
        //not found
        swal("warning", res.data.message, "warning");
      } else if (res.data.status === 422) {
        setProduct({ ...product, error_list: res.data.validate_err });
      }
    });
  };
  //add to cart
  //increment or decrement the quantity
  // const handleIncrement = () => {
  //   if (quantity < product.user_Qty) {
  //     setQuantity((prevQuantity) => prevQuantity + 1);
  //   }
  // };
  // const handleDecrment = () => {
  //   if (quantity > 1) {
  //     setQuantity((prevQuantity) => prevQuantity - 1);
  //   }
  // };

  return (
    <div className="container my-5">
      {product && (
        <div className="row">
          <div className="col-md-5">
            <img
              src={`http://localhost:8000/storage/${product.image}`}
              alt={product.product_name}
              className="img-fluid"
            />
            <p className="viewproduct">
              <strong>Features:</strong> {product.featured}
            </p>
          </div>
          <div className="col-md-7">
            <h2 className="viewproduct">{product.name}</h2>
            <p className="viewproduct">
              {/* <p>product_Id:{product.id}</p> */}
              <strong>Category Name:</strong> {product.name}
            </p>

            <p className="viewproduct">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="viewproduct">
              <strong>Brand:</strong> {product.brand}
            </p>

            <p className="viewproduct">
              <strong>Selling Price:</strong> {product.selling_price}
            </p>
            <p className="viewproduct">
              <strong>Original Price:</strong> {product.original_price}
            </p>
            <p className="viewproduct"><strong>user_Qty</strong>
            <input
              type="number"
              min="1"
              max="10"
              name="user_Qty"
              value={product.user_Qty}
              onChange={handleInput}
            />
</p>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              <Link to="/addCart" className="viewCart">
                Add To Cart
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
