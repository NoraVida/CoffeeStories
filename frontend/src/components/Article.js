import React from 'react';

export default function Article({
  title,
  content,
  date,
}) {
  return (
    <div className="card p-5 m-5">
      <h2 className="mb-4">{title}</h2>
      <div className="about-text-container">
        <div className="about-text">{content}</div>
        <div className="about-text">
          {new Date(date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
