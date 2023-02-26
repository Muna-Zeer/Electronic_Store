import React from 'react';
import {Link} from 'react-router-dom';


const AdminFooter=()=>{
    return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer-copyright text-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="copyright-text">
                                            copyright &copy;{ new Date().getFullYear()} All rights reserved.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </div>            </div>
        </footer>
    )
}
export default AdminFooter;