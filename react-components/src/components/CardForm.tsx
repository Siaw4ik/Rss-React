import { CardFormProps } from 'date/types_date';
import React from 'react';

export function CardForm(props: CardFormProps) {
  return (
    <div data-testid="card" className="cardForm">
      <div className="card-descriptionForm">
        <img className="image-productForm" src={props.person.imageUrl} alt="image product" />
        <div className="total-description-productForm">
          <h3 className="title-personForm">{props.person.name}</h3>
          <span className="species-personForm">Species: {props.person.species}</span>
          <span className="gender-personForm">Gender: {props.person.gender}</span>
          <span className="status-personForm">Status: {props.person.status}</span>
          <span className="location-personForm">Location: {props.person.location}</span>
          <p className="date-personForm">{props.person.date}</p>
        </div>
      </div>
    </div>
  );
}
