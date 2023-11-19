import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonResponce } from '../types/PokemonsResponce';
import { CardResponse } from '../types/CardPesponse';

type QueryType = {
  name: string;
  page: number;
  pageSize: number;
};
export const personApi = createApi({
  reducerPath: 'personApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/' }),
  endpoints: (builder) => ({
    getPersons: builder.query<PokemonResponce, QueryType>({
      query: ({ name, page, pageSize }) =>
        `cards/?page=${page}&pageSize=${pageSize}${
          name ? `&q=name:${name}` : ''
        }`,
    }),
    getPerson: builder.query<CardResponse, string>({
      query: (id) => `cards/${id}`,
    }),
  }),
});

export const { useGetPersonsQuery, useGetPersonQuery } = personApi;
