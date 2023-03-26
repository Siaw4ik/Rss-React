import React, { Component } from 'react';
import { ProductProps, ShowState } from '../date/types_date';
import { ImageLike } from './ImageLike';

export class Card extends Component<ProductProps, ShowState> {
  constructor(props: ProductProps) {
    super(props);
    this.state = { isActive: false };
    this.handleClickShow = this.handleClickShow.bind(this);
  }

  handleClickShow() {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    const product = this.props.product;
    const isActive = this.state.isActive;
    return (
      <div data-testid="card" className="card">
        <div className="card-description">
          <img className="image-product" src={product.image} alt="image product" />
          <p className="price-product">$ {product.price}</p>
          <div className="total-description-product">
            <h4 className="title-product">{product.title}</h4>
            <div data-testid="rating-product" className="rating-product">
              {isActive && (
                <p data-testid="rate-product" className="rate-product">
                  Rating: {product.rating.rate}
                </p>
              )}
              {isActive && (
                <p data-testid="count-product" className="count-product">
                  Count: {product.rating.count}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="wrapper-like">
          <div data-testid="show-details" className="show-details" onClick={this.handleClickShow}>
            {isActive ? 'Hide details' : 'Show details'}
          </div>
          <ImageLike id={product.id} />
        </div>
      </div>
    );
  }
}
