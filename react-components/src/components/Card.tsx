import React, { Component } from 'react';
import { changedateProducts } from 'date/date';
import { Product } from 'date/types_date';

type ProductProps = {
  product: Product;
};

class Card extends Component<ProductProps> {
  constructor(props: ProductProps) {
    super(props);
  }

  render() {
    const product = this.props.product;
    return (
      <div className="card">
        <img className="image-product" src={product.image} alt="image product" />
        <p className="price-product">$ {product.price}</p>
        <div className="total-description-product">
          <h4 className="title-product">{product.title}</h4>
          <div className="rating-product">
            <p className="rate-product">Rating: {product.rating.rate}</p>
            <p className="count-product">Count: {product.rating.count}</p>
          </div>
        </div>
      </div>
    );
  }
}

export class CardList extends Component {
  render() {
    {
      console.log(changedateProducts);
    }
    return (
      <div className="container_cards">
        {changedateProducts.map((dateproduct) => (
          <Card product={dateproduct} key={dateproduct.id} />
        ))}
      </div>
    );
  }
}
