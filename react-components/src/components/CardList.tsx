import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  useGetPersonsByNameQuery /* useGetPersonsStartQuery */,
} from '../redux/services/rick_morti';
import { Error } from './Error';
import { Loader } from './Loader';

export function CardList() {
  const inputValue = useSelector((state: RootState) => state.search.inputValue);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const { data, isError, isFetching } = useGetPersonsByNameQuery(value);

  return (
    <div data-testid="container_cards" className="container_cards">
      {isFetching ? (
        <Loader />
      ) : isError ? (
        <Error onMini={false} />
      ) : (
        data?.results.map((person) => <Card person={person} key={person.id} />)
      )}
    </div>
  );
}
