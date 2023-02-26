/* eslint-disable react-hooks/rules-of-hooks */

import swal from "sweetalert";
import React, { useState,useEffect  } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Editproduct = (props) => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [image, setImage] = useState({ image: null });
  const [error_List, setErrorList] = useState([]);
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

  const handleInput = (e) => {
    e.persist();
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleImage = (e) => {
    console.log("e.target.files[0]", e.target.files[0]); // check the selected file
    const file = e.target.files[0];
    setImage({ ...image, image: file });
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

  useEffect(() => {
    // axios.get(`http://127.0.0.1:8000/api/viewItems`).then((res) => {
    //   if (res.data.status === 200) {
    //     setListItems(res.data.products);
    //   }
    // });

    axios.get(`http://127.0.0.1:8000/api/edit-product/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log("res.data.product", res.data.product);
        setProduct(res.data.product);
      } else if (res.data.status === 404) {
        swal("error", res.data.message, "error");
        navigate("/admin/view-product");
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const updateProduct = (e) => {
    e.preventDefault();
 
    const data = {
      category_id: product.category_id,
      product_name: product.product_name,
      description: product.description,
      brand: product.brand,
      selling_price: product.selling_price,
      original_price: product.original_price,
      Qty: product.Qty,
      featured: product.featured,
      image: image.image,


  }
    axios
      .put(`http://127.0.0.1:8000/api/update-product/${id}`,data
    
        
        )
      .then((res) => {
        if (res.data.status === 200) {
          swal("success", res.data.message, "success");
          setErrorList([]);
        } 
        else if ((res.data.status = 422)) {
          swal("All field required monolatry", "warning");
          console.log('res.data.errors',res.data.errors);
          setErrorList(res.data.errors);
        }
         else if (res.data.status === 404) {
          swal("error", res.data.message, "error");
          navigate("/admin/view-product");
        }
      });
  };
  
  if (loading) {
    return <h4> Edit data product loading ....</h4>;
  }

  return (
    <div>
      <div className="container-fluid px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>
              Edit Product
              <Link
                to="/admin/view-product"
                className="btn btn-primary btn-sm float-end"
              >
                View Product
              </Link>
            </h4>
          </div>
          <div className="card-body">
          <form
            onSubmit={updateProduct}
            encType="multipart/form-data"
            action="/uploads"
            method="POST"
          >
            <div className="form-group mb-3">
         
              <label>Select Category</label>

              <select
                name="category_id"
                onChange={handleInput}
                value={type.id}
                className="form-control"
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
            <div className="form-group mb-3">
              <label htmlFor="product_name">Product Name</label>
              <input
                type="text"
                name="product_name"
                onChange={handleInput}
                value={product.product_name}
                className="form-control"
              />
              <small className="text-danger">{error_List.product_name}</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                onChange={handleInput}
                value={product.description}
                className="form-control"
              />
              <small className="text-danger">{error_List.description}</small>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="brand">Product brand</label>
              <input
                type="text"
                name="brand"
                onChange={handleInput}
                value={product.brand}
                className="form-control"
              />
              <small className="text-danger">{error_List.brand}</small>
            </div>
            <div className="col-md-4 form-group mb-3">
              <label>Selling Price</label>
              <input
                type="text"
                name="selling_price"
                onChange={handleInput}
                value={product.selling_price}
                className="form-control"
              />
              <small className="text-danger">{error_List.selling_price}</small>
            </div>
            <div className="col-md-4 form-group mb-3">
              <label>Original Price</label>
              <input
                type="text"
                name="original_price"
                onChange={handleInput}
                value={product.original_price}
                className="form-control"
              />
              <small className="text-danger">{error_List.original_price}</small>
            </div>
            <div className="col-md-4 form-group mb-3">
              <label>Quantity</label>
              <input
                type="text"
                name="Qty"
                onChange={handleInput}
                value={product.Qty}
                className="form-control"
              />
              <small className="text-danger">{error_List.Qty}</small>
            </div>
            <div className="col-md-4 form-group mb-3">
              <label>featured</label>
              <input
                type="text"
                name="featured"
                onChange={handleInput}
                value={product.featured}
                className="form-control"
              />
              <small className="text-danger">{error_List.featured}</small>
            </div>
            <div className="col-md-8 form-group mb-3">
              <label>Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImage}
                className="form-control"
              />

              <small className="text-danger">{error_List.image}</small>
            </div>
            <button type="submit" className="btn btn-primary px-4 mt-2">
              Submit
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Editproduct;
