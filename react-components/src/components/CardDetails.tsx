import { CardDetailsProps } from 'date/types_date';
import React from 'react';
import cross from '../assets/close.svg';

export function CardDetails({ person, onClose }: CardDetailsProps) {
  if (!person) {
    return null;
  }
  return (
    <div className="container-cardDetails">
      <img
        className="cardDetails-cross"
        src={cross}
        alt="image for close card details"
        onClick={() => onClose()}
      />
      <img className="cardDetails-image" src={person.image} alt={person.name} />
      <div className="cardDetails-description">
        <p className="person-name">{person.name}</p>
        <p className="person-gender">Gender: {person.gender}</p>
        <p className="person-species">Spesies: {person.species}</p>
        <p className="person-location">Location: {person.location.name}</p>
        <p className="person-status">Status: {person.status}</p>
      </div>
      <p className="cardDetails-date">{person.created.split('T')[0]}</p>
    </div>
  );
}
