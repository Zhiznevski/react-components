import { Pokemon } from './Pokemon';

export type PokemonResponce = {
  data: Pokemon[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};
