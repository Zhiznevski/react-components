import Person from './Person';

export type AppState = {
  persons: Person[];
  value: string;
  loading: boolean;
  error: boolean;
};
