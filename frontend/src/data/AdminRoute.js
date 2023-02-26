import React, { useState, useEffect } from "react";
import { Link, useNavigate, Route } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Adminpanel from "../admin/Adminpanel/adminpanel.admin";

const AdminRoute = ({ ...rest }) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/checkingAuthenticated`).then((res) => {
      if (res.status === 200) {
        setAuthenticated(true);
      }
      setLoading(false);
    });
    return () => {
      setAuthenticated(false);
    };
  }, []);
  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        swal("Unauthorized", err.response.data.message, "warning");
        navigate("/");
      }
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 403) {
        // Access Denied
        swal("Forbidden", error.response.data.message, "warning");
        navigate("/forbidden");
      } else if (error.response.status === 404) {
        //Page Not Found
        swal("404 Error", "Url/Page Not Found", "warning");
        navigate("/notfound");
      }
      return Promise.reject(error);
    }
  );

  if (loading) {
    return <h1>Loading..</h1>;
  }
  return (
    <Route
      {...rest}
      render={({ props, location }) =>
        authenticated ? (
          <Adminpanel {...props} />
        ) : (
          <Link to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
export default AdminRoute;
