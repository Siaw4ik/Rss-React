import React, { useState } from 'react';
import { ProductProps } from '../date/types_date';
import { ImageLike } from './ImageLike';

export function Card(props: ProductProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClickShow = () => {
    setIsActive(!isActive);
  };
  return (
    <div data-testid="card" className="card">
      <div className="card-description">
        <img className="image-product" src={props.product.image} alt="image product" />
        <p className="price-product">$ {props.product.price}</p>
        <div className="total-description-product">
          <h4 className="title-product">{props.product.title}</h4>
          <div data-testid="rating-product" className="rating-product">
            {isActive && (
              <p data-testid="rate-product" className="rate-product">
                Rating: {props.product.rating.rate}
              </p>
            )}
            {isActive && (
              <p data-testid="count-product" className="count-product">
                Count: {props.product.rating.count}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="wrapper-like">
        <div data-testid="show-details" className="show-details" onClick={handleClickShow}>
          {isActive ? 'Hide details' : 'Show details'}
        </div>
        <ImageLike id={props.product.id} />
      </div>
    </div>
  );
}
