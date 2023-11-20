import Person from './Person';

export type PersonsResponse = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Person[];
};
