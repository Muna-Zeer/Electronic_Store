import "./product.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
const Product = (props) => {
  const [products, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    async function getAllproduct() {
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
    getAllproduct();
  }, [currentPage]);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div>
      <div className="container">
        <div className="productList">
          <div className=" productListCard ">
            {products.length > 0 &&
              products.map((products, key) => {
                return (
                  <div className="productListBox">
                    <p style={{ color: "black" }}>{products.product_name}</p>
                    <div className="listImg">
                      <Link className="nav-link" to="">
                        <img
                          src={`http://localhost:8000/storage/${products.image}`}
                          alt={products.product_name}
                        />
                      </Link>
                    </div>
                    <div className="productListDetail">
                      <div className="ListTitle">
                        <span className="listPrice">
                          ${products.selling_price}
                        </span>

                        <span className="listPrice  originalPrice">
                          ${products.original_price}
                        </span>
                      </div>
                      <hr />
                      <p className="listItem">{products.description}</p>

                      <button className="btn-orderNow">
  <Link to={`/Product/view-product/${products.id}`} className="OrderOnline-orderNow">
    view product
  </Link>
</button>

                    </div>
                  </div>
                );
              })}
          </div>
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={prevPage}>
              Prev
            </button>
            <button disabled={products.length < perPage} onClick={nextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
