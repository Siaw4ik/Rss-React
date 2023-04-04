import React from 'react';
// import { dateProducts } from '../date/date';
import { Card } from './Card';
import { CardListProps } from 'date/types_date';

export function CardList({ persons, onCardClick }: CardListProps) {
  return (
    <div className="container_cards">
      {persons.map((person) => (
        <Card person={person} key={person.id} onCardClick={onCardClick} />
      ))}
    </div>
  );
}
