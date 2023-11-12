import { useContext } from 'react';
import { AppContext, AppContextType } from '../Context/AppContext';

export const useData = (): AppContextType | null => {
  const context = useContext(AppContext);
  return context;
};
