import { API_URL } from '../Constants/constants';
import Person from '../types/Person';

type Responce = {
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
  const apiURL = searchValue
    ? `${API_URL}?page=${page}&name=${searchValue}`
    : `${API_URL}?page=${page}`;
  try {
    const res = await fetch(apiURL);
    const data: Promise<Responce> = await res.json();
    return data;
  } catch {
    console.error();
  }
};
