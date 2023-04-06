import { CardDetailsProps } from 'date/types_date';
import React from 'react';
import cross from '../assets/close.svg';
import { Errors } from './Error';
import { Loader } from './Loader';

export function CardDetails({ person, onClose, onError, onLoading }: CardDetailsProps) {
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
      {onLoading && <Loader />}
      {!onLoading && (
        <>
          {onError && <Errors onError={onError} />}
          {!onError && (
            <div className="cardDetails-description">
              <img className="cardDetails-image" src={person.image} alt={person.name} />
              <p className="person-name">{person.name}</p>
              <p className="person-gender">Gender: {person.gender}</p>
              <p className="person-species">Spesies: {person.species}</p>
              <p className="person-location">Location: {person.location.name}</p>
              <p className="person-status">Status: {person.status}</p>
              <p className="cardDetails-date">{person.created.split('T')[0]}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
