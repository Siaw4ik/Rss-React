import React from 'react';
import imageError from '../assets/rickandmortiError.png';
import { ErrorProps } from 'date/types_date';

export function Errors({ onError }: ErrorProps) {
  return (
    <div className="container-errors">
      <h3>Error!</h3>
      <img className={`imageError${onError ? ' mini' : ''}`} src={imageError} alt="image error" />
      <div>
        <p>Your search result was not found!!!</p>
        <p>Please try again!!!</p>
      </div>
    </div>
  );
}
