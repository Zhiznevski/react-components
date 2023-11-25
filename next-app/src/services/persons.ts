import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonResponce } from '../types/PokemonsResponce';
import { CardResponse } from '../types/CardPesponse';
import { API_KEY } from '../Constants/constants';
import { HYDRATE } from 'next-redux-wrapper';

type QueryType = {
  name: string | string[]
  page: string | string[]
  pageSize: string | string[]
};
export const personApi = createApi({
  reducerPath: 'personApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
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

export const { useGetPersonsQuery, useGetPersonQuery,   util: { getRunningQueriesThunk }, } = personApi;

export const { getPersons, getPerson } = personApi.endpoints;