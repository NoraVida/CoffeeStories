import React from 'react';
import Rating from 'react-rating';

import { useAuthContext } from '../helper/AuthContext';
import coffeeIconColor from '../assets/icons/coffee-cup-rating-color.png';
import coffeeIconOpacity from '../assets/icons/coffee-cup-rating-opacity.png';

import '../scss/Coffee.scss';

export default function UserRating({
  user,
  ratingNumber,
  comment,
  onClickDelete,
}) {
  const { loggedInUser } = useAuthContext();

  return (
    <div className="card w-75 rating-card">
      <div className="card-body rating-card--body">
        <div className="name--rating">
          <h5 className="card-title">{user?.name}</h5>
          <Rating
            fullSymbol={<img src={coffeeIconColor} alt="colorful coffee icon" className="icon" />}
            emptySymbol={<img src={coffeeIconOpacity} alt="low opacity coffee icon" className="icon" />}
            initialRating={ratingNumber}
            readonly
          />
        </div>
        <p className="card-text ps-5">
          &quot;
          {comment}
          &quot;
        </p>
        {user._id === loggedInUser.userId ? (
          <button className="btn btn-primary" type="button" onClick={onClickDelete}>
            Törlés
          </button>
        ) : null }
      </div>
    </div>
  );
}
