import { CardFormProps } from 'date/types_date';
import React from 'react';

export function CardForm(props: CardFormProps) {
  return (
    <div data-testid="card" className="cardForm">
      <div className="card-descriptionForm">
        <img className="image-productForm" src={props.product.image} alt="image product" />
        <div className="total-description-productForm">
          <h3 className="title-productForm">{props.product.title}</h3>
          <p className="description-productForm">{props.product.description}</p>
          <span className="category-productForm">{props.product.category}</span>
          <div className="rating-productForm">
            <p className="count-productForm">Count: {props.product.count}</p>
            <p className="price-productForm">Price: ${props.product.price}</p>
          </div>
          <div className="availability-date_productForm">
            <span className="availability-productForm">{props.product.presence}</span>
            <span className="date-productForm">{props.product.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
