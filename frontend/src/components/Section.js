import React from 'react';
import { Link } from 'react-router-dom';

export default function Section({
  mainText, smallerText, path, btnText,
}) {
  return (
    <div className="section--container mt-5 p-3 ps-5">
      <h3 className="display-6">{mainText}</h3>
      <p className="lead">{smallerText}</p>
      <button className="btn btn-primary mb-4" type="button">
        <Link className="link" to={path}>
          {btnText}
        </Link>
      </button>
    </div>
  );
}
