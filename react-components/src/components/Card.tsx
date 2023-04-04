import React from 'react';
import { CardProps } from '../date/types_date';
import { ImageLike } from './ImageLike';

export function Card({ person, onCardClick }: CardProps) {
  return (
    <div data-testid="card" className="card">
      <div className="card-description" onClick={() => onCardClick(person)}>
        <img className="image-product" src={person.image} alt="image product" />
        <p className="name-person">{person.name}</p>
      </div>
      <ImageLike id={person.id} />
    </div>
  );
}
