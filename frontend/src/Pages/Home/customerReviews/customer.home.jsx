import React from 'react';
import Slider from 'react-slick';

function CustomerReviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const reviews = [
    { id: 1, name: 'John Doe', rating: 4, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur elit vel elit tristique, non iaculis mi ullamcorper.' },
    { id: 2, name: 'Jane Doe', rating: 5, comment: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.' },
    { id: 3, name: 'Bob Smith', rating: 3, comment: 'Vivamus aliquam venenatis purus, vel convallis justo hendrerit non.' },
  ];

  return (
    <div className="customer-reviews">
      <h2>Customer Reviews</h2>
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h3>{review.name}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomerReviews;
