import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './viewproduct.css';
const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  const getviewproducts = async () => {
    let isRendering = true;
    axios
      .get(`http://127.0.0.1:8000/api/viewproduct/${id}`)
      .then((res) => {
        if (isRendering) {
          if (res.status === 200) {
              setProduct(res.data.item);
            //   console.log("res.data.item.data", res.data.item.data);
            //   console.log("res.data", res.data);
            //   console.log("res.data.item", res.data.item);
              console.log("res.item", res.item);
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

  return (
    <div className="container my-5">
    {product && (
      <div className="row">
        <div className="col-md-5">
          <img src={`http://localhost:8000/storage/${product.image}`} alt={product.product_name} className="img-fluid" />
          <p className="viewproduct">
            <strong>Features:</strong> {product.featured}
          </p>
        </div>
        <div className="col-md-7">
          <h2 className="viewproduct">{product.name}</h2>
          <p className="viewproduct">
            <strong>Category Name:</strong> {product.name}
          </p>
         
          <p className="viewproduct">
            <strong>Descrption:</strong> {product.description}
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
        </div>
      </div>
    )}
  </div>
  );
};

export default ViewProduct;
