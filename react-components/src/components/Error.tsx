import React from 'react';
import imageError from '../assets/rickandmortiError.png';

export function Errors() {
  return (
    <div className="container-errors">
      <h3>Error!</h3>
      <img className="imageError" src={imageError} alt="image error" />
      <div>
        <p>Your search result was not found!!!</p>
        <p>Please try again!!!</p>
      </div>
    </div>
  );
}
