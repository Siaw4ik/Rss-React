import * as rtkQuery from '@reduxjs/toolkit/dist/query/react';

export type TypeRTKQuery = typeof rtkQuery & { default?: unknown };
const { createApi, fetchBaseQuery } = ((rtkQuery as TypeRTKQuery).default ??
  rtkQuery) as typeof rtkQuery;
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
