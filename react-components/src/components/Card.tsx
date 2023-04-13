import React from 'react';
import { CardProps } from '../date/types_date';
import { ImageLike } from './ImageLike';
import { useDispatch } from 'react-redux';
import { setId } from '../redux/features/personsSlice';

export function Card({ person, onShowDetails }: CardProps) {
  const dispatch = useDispatch();

  return (
    <div data-testid="card" className="card">
      <div
        data-testid="card-description"
        className="card-description"
        onClick={() => {
          console.log(person.id);
          dispatch(setId(person.id));
          onShowDetails();
        }}
      >
        <img className="image-product" src={person.image} alt="image product" />
        <p className="name-person">{person.name}</p>
      </div>
      <ImageLike id={person.id} />
    </div>
  );
}
