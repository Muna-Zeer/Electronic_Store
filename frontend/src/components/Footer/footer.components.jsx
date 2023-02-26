import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer=()=>{
    return(
        <div>
            <footer className=" footerWeb  py-3 mt-5">
<div className="row ">
    <div className="col-md-4">
        <h5>About Us</h5>
        <p>We are an online shopping website that offers a wide range of products at affordable prices. We strive to provide our customers with the best shopping experience possible.</p>

    </div>
    <div className=" col md-4">
    <h5>Contact Us</h5>
        <p text-light>Email: info@onlineshopping.com<br/>Phone: 555-555-5555</p>
    </div>
    <div className="text-light col-md-4">
        <h5>Follow Us</h5>
        <ul className="list-inline">
            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faFacebook}  className="iconStyle" /></a></li>
            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faInstagram} className="iconStyle"/></a></li>
            <li className="list-inline-item"><a href="#"><FontAwesomeIcon icon={faTwitter} className="iconStyle"/></a></li>
          
        </ul>
    </div>
    <hr/>
    <div class="text-center">
      <p>&copy; 2023 Online Shopping. All rights reserved.</p>
    </div>
</div>

            </footer>
           </div>
    )
}

export default Footer;