import { useState } from 'react';
import './App.css';
import image from './assets/pokemon.svg';
import SearchBar from './Components/SearchBar/SearchBar';
import Pagination from './Components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';
import DropDown from './Components/DropDown/DropDown';
import CardList from './Components/CardList/CardList';
import { useAppSelector } from './hooks/reduxHooks';
import { useGetPersonsQuery } from './services/persons';

const App: React.FC = () => {
  const isLoading = useAppSelector(
    (state) => state.cardsLoading.isCardsLoading
  );
  const searchValue = useAppSelector((state) => state.search.searchValue);
  const limit = useAppSelector((state) => state.limit.limit);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details');
  const { data } = useGetPersonsQuery({
    name: searchValue,
    page: +page,
    pageSize: limit,
  });
  const totalPages = data && Math.round(data.totalCount / data.pageSize);

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
        <SearchBar
          inputHandler={inputHandler}
          searchTerm={searchTerm}
          setSearchParams={setSearchParams}
        />
        <button onClick={errorHandler}>throw an error</button>
        <DropDown setSearchParams={setSearchParams} />
      </div>
      <Pagination
        page={page}
        details={details}
        setSearchParams={setSearchParams}
        pageCount={totalPages}
      />
      <div className="main-block">
        <div className="cards__wrapper">
          {details && <div className="hidden" onClick={closeDetails}></div>}
          <CardList
            cards={data?.data}
            isLoading={isLoading}
            page={page}
            setSearchParams={setSearchParams}
          />
        </div>
        {details && <Outlet context={[details, page, setSearchParams]} />}
      </div>
    </div>
  );
};

export default App;
