import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import image from './assets/rickMorty.png';
import Person from './types/Person';
import { getCharacters } from './api/api';
import SearchBar from './Components/SearchBar';
import Pagination from './Components/Pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router-dom';

const App: React.FC = () => {
  const item = JSON.parse(localStorage.getItem('searchItem_key')!) || '';
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [submitValue, setSubmitValue] = useState<string>(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(item);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const details = searchParams.get('details');

  console.log('searchParams', searchParams);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const errorHandler = () => {
    setError(true);
  };

  const closeDetails = () => {
    setSearchParams({ page: page });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCharacters(submitValue, page);
      if (data) {
        setPersons(data.results);
        setLoading(false);
        if (data.info.pages) setPageCount(data.info.pages);
      }
    };
    fetchData();
  }, [submitValue, page]);

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
          setPageCount={setPageCount}
          inputHandler={inputHandler}
          searchTerm={searchTerm}
          setSubmitValue={setSubmitValue}
        />
        <button onClick={errorHandler}>throw an error</button>
      </div>
      <div className="main-block">
        {loading ? (
          <span className="loader"></span>
        ) : (
          <div className="cards__wrapper">
            {details && <div className="hidden" onClick={closeDetails}></div>}
            {persons?.length ? (
              persons?.map((person) => (
                <div
                  style={{ transition: '.3s' }}
                  key={person.id}
                  onClick={() =>
                    setSearchParams((prev) => ({
                      ...prev,
                      page: page,
                      details: person.id.toString(),
                    }))
                  }
                >
                  <Card character={person} key={person.id}></Card>
                </div>
              ))
            ) : (
              <div>No results match your search criteria</div>
            )}
          </div>
        )}
        {details && <Outlet context={[details, page, setSearchParams]} />}
      </div>
      <Pagination
        page={page}
        details={details}
        setSearchParams={setSearchParams}
        pageCount={pageCount}
      />
    </div>
  );
};

export default App;
