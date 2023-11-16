import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Person from '../types/Person';
import { PersonsResponse } from '../types/Responce';

type QueryType = {
  name: string;
  page: string;
};
export const personApi = createApi({
  reducerPath: 'personApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getPersons: builder.query<PersonsResponse, QueryType>({
      query: ({ name, page }) => `character/?page=${page}&name=${name}`,
    }),
    getPerson: builder.query<Person, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetPersonsQuery, useGetPersonQuery } = personApi;
