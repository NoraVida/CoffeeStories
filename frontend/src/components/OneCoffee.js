import React from 'react';
// import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import coffeeIconColor from '../assets/icons/coffee-cup-rating-color.png';
import coffeeIconOpacity from '../assets/icons/coffee-cup-rating-opacity.png';
import '../scss/Coffee.scss';

export default function OneCoffee({
  productName,
  productDescription,
  productRating,
  ratingNumber,
}) {
  return (
    <div className="card w-75">
      <div className="card-body">
        <h2 className="card-title">{productName}</h2>
        <div className="container--rating">
          <Rating
            fullSymbol={<img src={coffeeIconColor} alt="colorful coffee icon" className="icon" />}
            emptySymbol={<img src={coffeeIconOpacity} alt="low opacity coffee icon" className="icon" />}
            initialRating={productRating}
            readonly
          />
          <p className="ps-3">
            {ratingNumber}
            {' '}
            értékelés
          </p>
        </div>
        <h3>Termék jellemzői:</h3>
        <h3>Termékleírás:</h3>
        <p className="card-text">{productDescription}</p>
      </div>
    </div>
  );
}
