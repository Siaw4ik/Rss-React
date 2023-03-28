import React, { useState } from 'react';
import { dateProducts } from '../date/date';
import { Card } from './Card';

export function CardList() {
  const [products] = useState(dateProducts);
  return (
    <div className="container_cards">
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}
