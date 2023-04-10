import { CardDetailsProps } from 'date/types_date';
import React from 'react';
import cross from '../assets/close.svg';
import { Error } from './Error';
import { Loader } from './Loader';

export function CardDetails({ person, onClose, onError, onLoading }: CardDetailsProps) {
  if (!person) {
    return null;
  }
  return (
    <div data-testid="container-cardDetails" className="container-cardDetails">
      <img
        data-testid="cardDetails-cross"
        className="cardDetails-cross"
        src={cross}
        alt="image for close card details"
        onClick={() => onClose()}
      />
      {onLoading && <Loader />}
      {!onLoading && (
        <>
          {onError && <Error onError={onError} />}
          {!onError && (
            <div className="cardDetails-description">
              <img className="cardDetails-image" src={person.image} alt={person.name} />
              <p data-testid="person-name" className="person-name">
                {person.name}
              </p>
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
