import React from 'react';
import './Loading.css';

const LoadingOverlay = () => {
  return (
    <div class="overlay">
      <div class="spinner-grow text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
