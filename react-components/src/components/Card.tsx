import React, { useState } from 'react';
import { CardProps } from '../date/types_date';
import { ImageLike } from './ImageLike';
import { useDispatch } from 'react-redux';
import { setId } from '../redux/features/personsSlice';
import { CardDetails } from './CardDetails';

export function Card({ person }: CardProps) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div data-testid="card" className="card">
      {isShow && (
        <div
          data-testid="cardDetails-shadow"
          className="cardDetails-shadow"
          onClick={() => {
            setIsShow(false);
          }}
        ></div>
      )}
      {isShow && (
        <CardDetails
          onClose={() => {
            setIsShow(false);
          }}
        />
      )}
      <div
        data-testid="card-description"
        className="card-description"
        onClick={() => {
          dispatch(setId(person.id));
          setIsShow(true);
        }}
      >
        <img className="image-product" src={person.image} alt="image product" />
        <p className="name-person">{person.name}</p>
      </div>
      <ImageLike id={person.id} />
    </div>
  );
}
