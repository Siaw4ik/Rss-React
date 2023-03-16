import React, { Component } from 'react';
import { changedateProducts } from '../date/date';
import { Card } from './Card';

export class CardList extends Component {
  render() {
    return (
      <div className="container_cards">
        {changedateProducts.map((dateproduct) => (
          <Card product={dateproduct} key={dateproduct.id} />
        ))}
      </div>
    );
  }
}
