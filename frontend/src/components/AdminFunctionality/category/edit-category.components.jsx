/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect ,useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCategories = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [categoryInput, setCategoryInput] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/edit-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log("res.data.categoryInput", res.data.category);
        setCategoryInput(res.data.category);
      } else if (res.data.status === 404) {
        swal("warning", res.data.message, "warning");
        navigate("/admin/view-category");
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const handleInput = (e) => {
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const updateCategory = (e) => {
    e.preventDefault();
    const data = categoryInput;

    axios
      .put(`http://127.0.0.1:8000/api/update-category/${id}`, data)
      .then((res) => {
        if (res.data.status === 200) {
          swal("success", res.data.message, "success");
          setError([]);
        } else if (res.data.status === 422) {
          swal("All fields ara required", res.data.message, "error");
          setError(res.data.errors);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
          navigate("/admin/view-category");
        }
      });
  };
  if (loading) {
    return <h4>Loading Edit category ...</h4>;
  }
  return (
    <div>
      <div className="container px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>
              Edit Category
              <Link
                to="/admin/view-category"
                className="btn btn-primary btn-sm float-end"
              >
                BACK
              </Link>
            </h4>
          </div>
          <div className="card-body">
          <form onSubmit={updateCategory} >

<div class="form-group">
<label>Category Type</label>
    <input type="text" class="form-control" name="name" onChange={handleInput} value={categoryInput.name} placeholder="Category Type " required />
    <small className="text-danger">{error.name}</small>
</div>  

<div class="form-group">
<label>Category Description</label>
    <textarea class="form-control" name="description" onChange={handleInput} value={categoryInput.description} placeholder="Category description" required />
    <small className="text-danger">{error.description}</small>
</div> 
<button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
</form>

          </div>
        </div>
      </div>
    </div>
  );
};
export default EditCategories;
