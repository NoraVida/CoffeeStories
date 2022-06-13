import React from 'react';
import { Link } from 'react-router-dom';

import '../scss/Coffee.scss';

export default function Coffee({
  productId,
  productName,
  productDescription,
}) {
  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title pb-2">{productName}</h5>
        <p className="card-text">{productDescription}</p>
        <Link to={`/coffees/${productId}`} state={productId} className="btn btn-primary">
          Értékelések megtekintése
        </Link>
      </div>
    </div>
  );
}
