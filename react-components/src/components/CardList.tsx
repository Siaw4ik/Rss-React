import React from 'react';
import { Card } from './Card';
import { CardListProps } from '../date/types_date';

export function CardList({ persons, onShowDetails }: CardListProps) {
  return (
    <div data-testid="container_cards" className="container_cards">
      {persons.map((person) => (
        <Card person={person} key={person.id} onShowDetails={onShowDetails} />
      ))}
    </div>
  );
}
