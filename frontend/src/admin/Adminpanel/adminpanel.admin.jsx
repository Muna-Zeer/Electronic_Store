import React from "react";
import NavbarAdmin from "../navbar/navbar.admin";
import Sidebar from "../sidebar/sidebar.admin";
import AdminFooter from "../footer/footer.admin";
import routePath from "../../data/routes";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import  'bootstrap/dist/js/bootstrap.bundle.min.js';


const Adminpanel = () => {
 
  return (
    <div>
      <div className="sb-nav-fixed">
        {/* <NavbarAdmin /> */}
        <div id="sidebar">
          <div id="sidebar-nav">
            {/* <Sidebar /> */}
          </div>
          <div id="sidebar-content">
            <main>
              <Routes>
                {routePath.map((item, index) => {
                  return (
                    item.component && (
                      <Route
                        key={index}
                        path={item.path}
                        exact={item.exact}
                        name={item.name}
                        element={<item.component />}
                        render={(props) => (
                          <item.component {...props} />
                      )}
                      />

                    )
                  );
                })}
                
              </Routes>
              <Link from="/admin" to="/admin/dashboard/" />
            
            </main>
            {/* <AdminFooter /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Adminpanel;
