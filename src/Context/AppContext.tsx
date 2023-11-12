import { createContext, useState } from 'react';
import Person from '../types/Person';

export interface AppContextType {
  persons: Person[] | null;
  setPersons: React.Dispatch<React.SetStateAction<Person[] | null>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const item: string = JSON.parse(localStorage.getItem('searchItem_key')!) || '';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>(item);
  return (
    <AppContext.Provider
      value={{ persons, setPersons, searchValue, setSearchValue }}
    >
      {children}
    </AppContext.Provider>
  );
};
