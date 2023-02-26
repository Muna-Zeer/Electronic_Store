/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
// import {  useEffect } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
const Addproduct = () => {
  const [listItems, setListItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [product, setProduct] = useState({
    category_id: "",
    product_name: "",
    description: "",
    brand: "",
    selling_price: "",
    original_price: "",
    Qty: "",
    featured: "",
  });

  const [images, setImages] = useState({ image: null });

  const [errorList, setErrorList] = useState([]);
  const handleInput = (e) => {
    e.persist();
    console.log("e.target.name, e.target.value", e.target.name, e.target.value); // check the input field name and value
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    console.log("e.target.files[0]", e.target.files[0]); // check the selected file
    const file = e.target.files[0];
    setImages({ ...images, image: file });
  };

  //get category type of product
  const [type, setTypes] = useState([]);
  useEffect(() => {
    async function getAllType() {
      try {
        const type = await axios.get("http://127.0.0.1:8000/api/categoryType");
        console.log("type.data", type.data.category);
        setTypes(type.data.category);
      } catch (error) {
        console.log(error);
      }
    }
    getAllType();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // check that the function is being called
    // const formData = new FormData();
    // formData.append("category_id", product.category_id);
    // formData.append("product_name", product.product_name);
    // formData.append("description", product.description);
    // formData.append("brand", product.brand);
    // formData.append("selling_price", product.selling_price);
    // formData.append("original_price", product.original_price);
    // formData.append("Qty", product.Qty);
    // formData.append("featured", product.featured);

    // if (images.image) {
    //   formData.append("image", images.image);
    //   console.log("image in if", images.image);
    // }

  

    const formData = {
      category_id: product.category_id,
      product_name: product.product_name,
      description: product.description,
      brand: product.brand,
      selling_price: product.selling_price,
      original_price: product.original_price,
      Qty: product.Qty,
      featured: product.featured,
      image: images.image,


  }
  console.log("image", images.image);
    console.log("log Qty", product.Qty);
    console.log("formData is", formData);
    console.log("product is", product);
    console.log("images is", images);
    axios
      .post(`http://127.0.0.1:8000/api/store-product`, formData 
      ,{
        headers: {
          "Content-Type": "multipart/form-data",
        }}
        
        
        )
      .then((res) => {
        if (res.data.status === 200) {
          swal("success", res.data.message, "success");

          setProduct({
            ...product,
            category_id: "",
            product_name: "",
            description: "",
            brand: "",
            selling_price: "",
            original_price: "",
            Qty: "",
            featured: "",
          });

          setErrorList([]);
        } else if (res.data.status === 422) {
          swal("warning", res.data.message, "warning");
          setErrorList(res.data.errors);
        }
      });
  };

  return (
    <div className="container-fluid col-md-8 px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Add Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              View Product
            </Link>
          </h4>
        </div>
        <div className="card-body ">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            action="/uploads"
            method="POST"
          >
            <div className= " col-md-12 form-group mb-3">
              {/* <select id="category-id" value={product.category_id} onChange={handleInput}>
  <option value="">Select a category</option>
  {type.map(category => (
    <option key={category.id} value={category.id} selected={category.id == product.category_id}>{category.name}</option>
  ))}
</select> */}
              <label>Select Category</label>

              <select
                name="category_id"
                onChange={handleInput}
                value={type.id}
                className=" col-md-12 form-control mb-3"
              >
                {type.length > 0 ? (
                  <>
                    <option value="">Select Category</option>
                    {type.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.id}- {item.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">Loading Categories...</option>
                )}
              </select>
            </div>
            <div className=" col-md-12 form-group mb-3">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                name="product_name"
                onChange={handleInput}
                value={product.product_name}
                className="form-control"
              />
              <small className="text-danger">{errorList.product_name}</small>
            </div>
            <div className="col-md-12 form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                onChange={handleInput}
                value={product.description}
                className="form-control"
              />
              <small className="text-danger">{errorList.description}</small>
            </div>
            <div className=" col-md-12 form-group mb-3">
              <label htmlFor="brand">Product brand</label>
              <input
                type="text"
                name="brand"
                onChange={handleInput}
                value={product.brand}
                className="form-control"
              />
              <small className="text-danger">{errorList.brand}</small>
            </div>
            <div className="col-md-12  form-group mb-3">
              <label>Selling Price</label>
              <input
                type="text"
                name="selling_price"
                onChange={handleInput}
                value={product.selling_price}
                className="form-control"
              />
              <small className="text-danger">{errorList.selling_price}</small>
            </div>
            <div className="col-md-12  form-group mb-3 ">
              <label>Original Price</label>
              <input
                type="text"
                name="original_price"
                onChange={handleInput}
                value={product.original_price}
                className="form-control"
              />
              <small className="text-danger">{errorList.original_price}</small>
            </div>
            <div className="col-md-12  form-group mb-3">
              <label>Quantity</label>
              <input
                type="text"
                name="Qty"
                onChange={handleInput}
                value={product.Qty}
                className="form-control"
              />
              <small className="text-danger">{errorList.Qty}</small>
            </div>
            <div className="col-md-12  form-group mb-3">
              <label>featured</label>
              <input
                type="text"
                name="featured"
                onChange={handleInput}
                value={product.featured}
                className="form-control"
              />
              <small className="text-danger">{errorList.featured}</small>
            </div>
            <div className="col-md-12 -6 form-group mb-3">
              <label>Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImage}
                className="form-control"
              />

              <small className="text-danger">{errorList.image}</small>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Addproduct;
