import React from 'react';
import brokenCupIcon from '../assets/icons/broken-mug.png';
import '../scss/App.scss';

export default function Loading() {
  return (
    <div className="loading--container">
      <img src={brokenCupIcon} alt="broken cup icon" className="acticle--icon message-icon" />
      <p>Valami gond történt...</p>
    </div>
  );
}
