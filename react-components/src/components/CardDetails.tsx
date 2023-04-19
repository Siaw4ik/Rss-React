import { CardDetailsProps, Person } from '../date/types_date';
import React, { useEffect, useState } from 'react';
import cross from '../assets/close.svg';
import { Error } from './Error';
import { Loader } from './Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetOnePersonByIdQuery } from '../redux/services/rick_morti';

export function CardDetails({ onClose }: CardDetailsProps) {
  const [person, setPerson] = useState<Person>();
  const id = useSelector((state: RootState) => state.persons.id);

  const { data, error, isFetching } = useGetOnePersonByIdQuery(id);

  useEffect(() => {
    setPerson(data);
  }, [data]);

  return (
    <div data-testid="container-cardDetails" className="container-cardDetails">
      <img
        data-testid="cardDetails-cross"
        className="cardDetails-cross"
        src={cross}
        alt="image for close card details"
        onClick={() => onClose()}
      />
      {isFetching ? (
        <Loader />
      ) : error ? (
        <Error onMini={true} />
      ) : (
        <div className="cardDetails-description">
          <img className="cardDetails-image" src={person?.image} alt={person?.name} />
          <p data-testid="person-name" className="person-name">
            {person?.name}
          </p>
          <p className="person-gender">Gender: {person?.gender}</p>
          <p className="person-species">Spesies: {person?.species}</p>
          <p className="person-location">Location: {person?.location.name}</p>
          <p className="person-status">Status: {person?.status}</p>
          <p className="cardDetails-date">{person?.created.split('T')[0]}</p>
        </div>
      )}
    </div>
  );
}
