/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Viewproduct = (props) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  async function getviewproducts() {
    try {
      const product = await axios.get(
        `http://127.0.0.1:8000/api/viewItems?page=${currentPage}`
      );
      console.log(product.data.products);
      setProduct(product.data.products.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getviewproducts();
  }, [currentPage]);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  document.title = "View Product";

  //view all product

   getviewproducts = async () => {
    let isRendering = true;
    axios
      .get(`http://127.0.0.1:8000/api/viewItems?page=${currentPage}`)
      .then((res) => {
        if (isRendering) {
          if (res.status === 200) {
            console.log("res.data.products.data", res.data.products.data);
            setProduct(res.data.products.data);
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
  }, [currentPage]);

  
  //delete category list pagination
  const deletecategory = async (id) => {
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
      .delete(`http://localhost:8000/api/delete-product/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        getviewproducts();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  //view table of products list

  var viewproduct = "";
  if (loading) {
    return <h4>Loading products...</h4>;
  } else {
    viewproduct = product.map((product) => {
      return (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.category_name}</td>
          <td>{product.product_name}</td>
          <td>{product.selling_price}</td>
          <td>{product.Qty}</td>
          <td>
            <img
              src={`http://localhost:8000/storage/${product.image}`}
              alt={product.product_name}
              style={{ width: 80, height: 80 }}
            />
          </td>

          <td>
            <Link
              className="btn btn-success btn-sm"
              to={`edit-product/${product.id}`}
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => deletecategory(product.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>
              product List
              <Link
                to="/admin/add-product"
                className="btn btn-primary btn-sm float-end"
              >
                Add product
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Product Name</th>
                  <th>Selling Price</th>
                  <th>Quantity</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>{viewproduct}</tbody>
              <div className="pagination">
                <button disabled={currentPage === 1} onClick={prevPage}>
                  Prev
                </button>
                <button disabled={product.length < perPage} onClick={nextPage}>
                  Next
                </button>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Viewproduct;
