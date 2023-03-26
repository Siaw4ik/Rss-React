import { CardFormProps, CardState } from 'date/types_date';
import React, { Component } from 'react';

export class CardForm extends Component<CardFormProps, CardState> {
  constructor(props: CardFormProps) {
    super(props);
  }
  render() {
    const product = this.props.product;
    return (
      <div data-testid="card" className="cardForm">
        <div className="card-descriptionForm">
          <img className="image-productForm" src={product.image} alt="image product" />
          <div className="total-description-productForm">
            <h3 className="title-productForm">{product.title}</h3>
            <p className="description-productForm">{product.description}</p>
            <span className="category-productForm">{product.category}</span>
            <div className="rating-productForm">
              <p className="count-productForm">Count: {product.count}</p>
              <p className="price-productForm">Price: ${product.price}</p>
            </div>
            <div className="availability-date_productForm">
              <span className="availability-productForm">{product.presence}</span>
              <span className="date-productForm">{product.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
