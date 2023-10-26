import { createRef } from 'react';
import { Component } from 'react';

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

const URL = 'https://rickandmortyapi.com/api/character/';

export default class App extends Component {
  state: { persons: Person[]; value: string } = {
    persons: [],
    value: '',
  };
  inputRef = createRef<HTMLInputElement>();

  submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = this.inputRef.current;
    if (target) {
      this.setState((prevState) => ({ ...prevState, value: target.value }));
    }
  };

  componentDidMount(): void {
    console.log('маунтинг');
    const item = JSON.parse(localStorage.getItem('searchItem')!);
    const apiUrl = item ? `${URL}?name=${item}` : URL;
    fetch(apiUrl).then((responce) =>
      responce.json().then((data) => {
        console.log(data);
        this.setState((prevState) => ({ ...prevState, persons: data.results }));
      })
    );
  }

  componentDidUpdate(
    prevProps: Record<string, never>,
    prevState: { persons: Person[]; value: string }
  ): void {
    console.log('обновление');
    if (prevState.value !== this.state.value) {
      fetch(`${URL}?name=${this.state.value}`)
        .then((responce) =>
          responce.json().then((data) => {
            console.log(data);
            this.setState((prevState) => ({
              ...prevState,
              persons: data.results,
            }));
          })
        )
        .then(() => {
          localStorage.setItem('searchItem', JSON.stringify(this.state.value));
        });
    }
  }

  render() {
    return (
      <div style={{ marginLeft: '45vw' }}>
        <form onSubmit={this.submitHandler}>
          <input ref={this.inputRef} type="search" placeholder="search"></input>
          <button type="submit">search</button>
        </form>
        <div>
          {this.state.persons?.map((person) => (
            <div key={person.id}>{person.name}</div>
          ))}
        </div>
      </div>
    );
  }
}
