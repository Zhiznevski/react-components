import { createRef } from 'react';
import { Component } from 'react';
import './App.css';

interface Person {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type AppState = {
  persons: Person[];
  value: string;
  loading: boolean;
  error: boolean;
};

const URL = 'https://rickandmortyapi.com/api/character/';

export default class App extends Component {
  state: AppState = {
    persons: [],
    value: '',
    loading: false,
    error: false,
  };

  inputRef = createRef<HTMLInputElement>();

  submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = this.inputRef.current;
    if (target) {
      this.setState((prevState) => ({ ...prevState, value: target.value }));
    }
  };

  errorHandler = () => {
    this.setState((prevState) => ({ ...prevState, error: true }));
  };

  componentDidMount(): void {
    const item = JSON.parse(localStorage.getItem('searchItem')!);
    const apiUrl = item ? `${URL}?name=${item}` : URL;
    this.setState((prevState) => ({ ...prevState, loading: true }));
    fetch(apiUrl).then((responce) =>
      responce.json().then((data) => {
        this.setState((prevState) => ({
          ...prevState,
          persons: data.results,
          loading: false,
        }));
      })
    );
  }

  componentDidUpdate(
    prevProps: Record<string, never>,
    prevState: AppState
  ): void {
    if (prevState.value !== this.state.value) {
      this.setState((prevState) => ({ ...prevState, loading: true }));
      fetch(`${URL}?name=${this.state.value}`).then((responce) =>
        responce.json().then((data) => {
          this.setState((prevState) => ({
            ...prevState,
            persons: data.results,
            loading: false,
          }));
          localStorage.setItem('searchItem', JSON.stringify(this.state.value));
        })
      );
    }
  }

  render() {
    if (this.state.error) {
      throw new Error('I crashed!');
    }
    if (this.state.loading) {
      return <div className="loading">Loading...</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.submitHandler}>
            <input
              ref={this.inputRef}
              type="search"
              placeholder="search"
            ></input>
            <button type="submit">search</button>
          </form>
          <div>
            {this.state.persons?.map((person) => (
              <div key={person.id}>{person.name}</div>
            ))}
          </div>
          <button onClick={this.errorHandler}>вызвать ошибку</button>
        </div>
      );
    }
  }
}
