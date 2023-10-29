import { createRef } from 'react';
import { Component } from 'react';
import './App.css';
import Card from './Components/Card';
import { AppState } from './types/AppState';
import image from './assets/rickMorty.png';

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
    const item = JSON.parse(localStorage.getItem('searchItem_key')!);
    const apiUrl = item ? `${URL}?name=${item}` : `${URL}?page=1`;
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
          localStorage.setItem(
            'searchItem_key',
            JSON.stringify(this.state.value)
          );
        })
      );
    }
  }

  render() {
    if (this.state.error) {
      throw new Error('I crashed!');
    }
    return (
      <div className="app-wrapper">
        <div className="main-logo">
          <img className="logo" src={image} alt="logo"></img>
        </div>
        <div className="control-block">
          <form className="search-form" onSubmit={this.submitHandler}>
            <input
              className="search-input"
              ref={this.inputRef}
              type="search"
              placeholder="Search by name"
            ></input>
            <button type="submit">search</button>
          </form>
          <button onClick={this.errorHandler}>throw an error</button>
        </div>
        {this.state.loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="cards__wrapper">
            {this.state.persons ? (
              this.state.persons?.map((person) => (
                <Card character={person} key={person.id}></Card>
              ))
            ) : (
              <div>No results match your search criteria</div>
            )}
          </div>
        )}
      </div>
    );
  }
}
