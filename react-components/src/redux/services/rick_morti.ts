import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RickMortiResponse, Person } from '../../date/types_date';

export const rick_mortiApi = createApi({
  reducerPath: 'rick_mortiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getPersonsStart: builder.query<RickMortiResponse, void>({
      query: () => `character`,
    }),
    getPersonsByName: builder.query<RickMortiResponse, string>({
      query: (name) => `character/?name=${name}`,
    }),
    getOnePersonById: builder.query<Person, number>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetPersonsStartQuery, useGetPersonsByNameQuery, useGetOnePersonByIdQuery } =
  rick_mortiApi;
