import { useState } from 'react';
import './App.css';
import image from './assets/rickMorty.png';
import SearchBar from './Components/SearchBar/SearchBar';
import Pagination from './Components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import DropDown from './Components/DropDown/DropDown';
import { useData } from './hooks/useData';
import CardList from './Components/CardList/CardList';
import { AppContextType } from './Context/AppContext';
import { useGetPersonsQuery } from './services/persons';

const App: React.FC = () => {
  const { searchValue } = useData() as AppContextType;
  const [loading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [limit, setLimit] = useState<number>(20);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details');

  const { data } = useGetPersonsQuery({ name: searchValue, page: page });

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const errorHandler = () => {
    setError(true);
  };

  const closeDetails = () => {
    setSearchParams({ page: page });
  };

  if (error) {
    throw new Error('I crashed!');
  }
  return (
    <div className="app-wrapper">
      <div className="main-logo">
        <img className="logo" src={image} alt="logo"></img>
      </div>
      <div className="control-block">
        <SearchBar inputHandler={inputHandler} searchTerm={searchTerm} />
        <button onClick={errorHandler}>throw an error</button>
        <DropDown
          limit={limit}
          setLimit={setLimit}
          setSearchParams={setSearchParams}
        />
      </div>
      <div className="main-block">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="cards__wrapper">
            {details && <div className="hidden" onClick={closeDetails}></div>}
            <CardList
              limit={limit}
              page={page}
              setSearchParams={setSearchParams}
            />
          </div>
        )}
        {details && <Outlet context={[details, page, setSearchParams]} />}
      </div>
      <Pagination
        page={page}
        details={details}
        setSearchParams={setSearchParams}
        pageCount={data?.info.count}
      />
    </div>
  );
};

export default App;
