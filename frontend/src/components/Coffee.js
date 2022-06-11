import React from 'react';
import { Link } from 'react-router-dom';
// import Rating from 'react-rating';
// import coffeeIconColor from '../assets/icons/coffee-cup-rating-color.png';
// import coffeeIconOpacity from '../assets/icons/coffee-cup-rating-opacity.png';
import '../scss/Coffee.scss';

export default function Coffee({
  productId,
  productName,
  productDescription,
  // productRating,
  // ratingNumber,
}) {
  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title pb-2">{productName}</h5>
        <div className="container--rating">
          {/* <Rating
            fullSymbol={<img src={coffeeIconColor} alt="colorful coffee icon" className="icon" />}
            emptySymbol={<img src={coffeeIconOpacity} alt="low opacity coffee icon" className="icon" />}
            initialRating={productRating}
            readonly
          />
          <p className="rating--ratingNumber">
            {ratingNumber}
            {' '}
            értékelés
          </p> */}
        </div>
        <p className="card-text">{productDescription}</p>
        <Link to={`/coffees/${productId}`} state={productId} className="btn btn-primary">
          Értékelések megtekintése
        </Link>
      </div>
    </div>
  );
}
