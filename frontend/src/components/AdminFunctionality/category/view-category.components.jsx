/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";
import "./category.css";
import Swal from "sweetalert2";
const ViewCategory = (props) => {
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const getAllcategory = async () => {
    let isRendering = true;
    axios.get(`http://127.0.0.1:8000/api/view-category?page=${currentPage}`).then((res) => {
      if (isRendering) {
        if (res.status === 200) {
          console.log("res.data.data", res.data.data);
          console.log("res.data.message", res.data.message);
          console.log("res.data.category.data", res.data.category.data);

          setListItems(res.data.category.data);
          setLoading(false);
        }
      }
    });
    return () => {
      isRendering = false;
    };
  };
  useEffect(()=>{
    getAllcategory();
  },[currentPage])
 

  // useEffect(() => {
  //   getAllcategory();
  // }, []);

   //create category list pagination
  //  useEffect(() => {
  //   const getAllList = async () => {
  //     try {
  //       const response = await axios.get(`http://127.0.0.1:8000/api/allCategories?page=${currentPage}`);
  //       console.log('response.data.data pagin');
  //       setListItems(response.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAllList();
  // }, [currentPage]);
  

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
      .delete(`http://localhost:8000/api/delete-category/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        getAllcategory();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };
  var ViewCategory = "";
  if (loading) {
    return <h4>Loading Category...</h4>;
  } else {
    ViewCategory = listItems.map((items) => {
      return (
        <tr key={items.id}>
          <td>{items.id}</td>
          <td>{items.name}</td>
          <td>{items.description}</td>
          <td>
            <Link className="btn btn-success btn-sm"
              to={`edit-category/${items.id}`}
              
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={() => deletecategory(items.id)}
              className="btn btn-danger btn-sm"
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
              Category List
              <Link
                to="/admin/add-category"
                className="btn btn-primary btn-sm float-end"
              >
                Add Category
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Type</th>

                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{ViewCategory}</tbody>
              <div className="pagination">
                <button
                  className="btnPrevious"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="spanCurrentPage">{currentPage}</span>
                <button
                  className="btnNext"
                  disabled={listItems.length < itemPerPage}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
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
export default ViewCategory;
