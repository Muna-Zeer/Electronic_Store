import Carousel from 'react-bootstrap/Carousel';
import './header.css'
import onlineSore_one from '../../assest/images/image1.jpeg'
import header from '../../assest/images/header.jpg'
import header2 from '../../assest/images/header2.jpg'
import onlineStore_two from '../../assest/images/onlineStore_2.jpeg'
import onlineStore_three from '../../assest/images/storeOnline.jpeg'
import NavigationHeader from '../navbar/navbar.componenets';
const CarouselFade=() =>{
 
    return (
 
    <Carousel fade>
       
     <Carousel.Item>
     <div>
    <NavigationHeader/>
  </div>
  <img
    className="d-block w-200"
    src={header}
    alt="First slide"
  />
  <Carousel.Caption>
    {/* <h1>electricite Shopping</h1> */}
   
  </Carousel.Caption>
  
</Carousel.Item>

      <Carousel.Item>
      <div>
    <NavigationHeader/>
  </div>
        <img
          className="d-block w-200"
          src={header2}
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h1>electrical Sale</h1> */}
       
        </Carousel.Caption>
      
      </Carousel.Item>
      <Carousel.Item>
      <div>
    <NavigationHeader/>
  </div>
        <img
          className="d-block w-200"
          src={onlineStore_three}
          alt="Third slide"
        />

        <Carousel.Caption>
          {/* <h1 >Buy Home Application</h1> */}
        
        </Carousel.Caption>
     
      </Carousel.Item>
   
    </Carousel>
    
  );
}

export default CarouselFade;