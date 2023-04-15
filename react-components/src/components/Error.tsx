import React from 'react';
import imageError from '../assets/rickandmortiError.png';
import { ErrorProps } from 'date/types_date';

export function Error({ onMini }: ErrorProps) {
  return (
    <div className="container-errors">
      <h3 data-testid="title-error">Error!</h3>
      <img
        data-testid="img-error"
        className={`imageError${onMini ? ' mini' : ''}`}
        src={imageError}
        alt="image error"
      />
      <div>
        <p>Your search result was not found!!!</p>
        <p>Please try again!!!</p>
      </div>
    </div>
  );
}
