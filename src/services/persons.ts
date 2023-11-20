import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonResponce } from '../types/PokemonsResponce';
import { CardResponse } from '../types/CardPesponse';
import { API_KEY } from '../Constants/constants';

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
      query: ({ name, page, pageSize }) => ({
        url: `cards/?page=${page}&pageSize=${pageSize}${
          name ? `&q=name:${name}` : ''
        }`,
        headers: {
          'X-Api-Key': API_KEY,
        },
      }),
    }),
    getPerson: builder.query<CardResponse, string>({
      query: (id) => ({
        url: `cards/${id}`,
        headers: {
          'X-Api-Key': API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetPersonsQuery, useGetPersonQuery } = personApi;
