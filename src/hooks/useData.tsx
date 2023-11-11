import { useContext } from 'react';
import { AppContext, AppContextType } from '../Context/AppContext';

export const useData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
