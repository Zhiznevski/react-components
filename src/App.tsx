import { createRef, useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import image from './assets/rickMorty.png';
import Person from './types/Person';

const URL = 'https://rickandmortyapi.com/api/character/';

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = createRef<HTMLInputElement>();

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = inputRef.current;
    if (target) {
      setSearchValue(target.value);
    }
  };

  const errorHandler = () => {
    setError(true);
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('searchItem_key')!);
    const apiUrl = item ? `${URL}?name=${item}` : `${URL}?page=1`;
    setLoading(true);
    fetch(apiUrl).then((responce) =>
      responce.json().then((data) => {
        setPersons(data.results);
        setLoading(false);
      })
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${URL}?name=${searchValue}`).then((responce) =>
      responce.json().then((data) => {
        setPersons(data.results);
        setLoading(false);
      })
    );
    localStorage.setItem('searchItem_key', JSON.stringify(searchValue));
  }, [searchValue]);

  if (error) {
    throw new Error('I crashed!');
  }
  return (
    <div className="app-wrapper">
      <div className="main-logo">
        <img className="logo" src={image} alt="logo"></img>
      </div>
      <div className="control-block">
        <form className="search-form" onSubmit={submitHandler}>
          <input
            className="search-input"
            ref={inputRef}
            type="search"
            placeholder="Search by name"
          ></input>
          <button type="submit">search</button>
        </form>
        <button onClick={errorHandler}>throw an error</button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="cards__wrapper">
          {persons ? (
            persons?.map((person) => (
              <Card character={person} key={person.id}></Card>
            ))
          ) : (
            <div>No results match your search criteria</div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
