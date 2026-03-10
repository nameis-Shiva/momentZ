import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner-ring outer"></div>
        <div className="spinner-ring inner"></div>
        <div className="spinner-center"></div>
      </div>
    </div>
  );
};

export default Loading;