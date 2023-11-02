import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import image from './assets/rickMorty.png';
import Person from './types/Person';
import { getCharacters } from './api/api';
import SearchBar from './Components/SearchBar';

const App: React.FC = () => {
  const item = JSON.parse(localStorage.getItem('searchItem_key')!);
  const [persons, setPersons] = useState<Person[] | null>(null);
  const [submitValue, setSubmitValue] = useState<string>(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(item);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const errorHandler = () => {
    setError(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCharacters(submitValue);
      if (data) {
        setPersons(data.results);
        setLoading(false);
      }
    };
    fetchData();
  }, [submitValue]);

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
          setSubmitValue={setSubmitValue}
        />
        <button onClick={errorHandler}>throw an error</button>
      </div>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="cards__wrapper">
          {persons?.length ? (
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
