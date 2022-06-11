import React from 'react';
import coffeeCupIcon from '../assets/icons/coffeecup.png';
import '../scss/App.scss';

export default function Loading() {
  return (
    <div className="loading--container">
      <img src={coffeeCupIcon} alt="coffee cup icon" className="acticle--icon message-icon loading-icon" />
      <p>Betöltés...</p>
    </div>
  );
}
