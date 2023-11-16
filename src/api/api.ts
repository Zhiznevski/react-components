import { API_URL } from '../Constants/constants';
import Person from '../types/Person';

type Response = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: Person[];
};
export const getCharacters = async (
  searchValue: string,
  page: string | null = '1'
) => {
  const apiURL = `${API_URL}?page=${page}&name=${searchValue}`;
  try {
    const res = await fetch(apiURL);
    const data: Promise<Response> = await res.json();
    return data;
  } catch {
    console.error();
  }
};

export const getCharacter = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data: Promise<Person> = await res.json();
    return data;
  } catch {
    console.error();
  }
};
