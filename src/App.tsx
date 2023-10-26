import { createRef } from 'react';
import { Component } from 'react';

interface Person<T> {
  name: T;
  height: T;
  mass: T;
  hair_color: T;
  skin_color: T;
  eye_color: T;
  birth_year: T;
  gender: T;
  homeworld: T[];
  films: T[];
  species: T[];
  vehicles: T[];
  starships: T[];
  created: T;
  edited: T;
  url: T;
}

export default class App extends Component {
  state: { persons: Person<string>[]; value: string } = {
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
    fetch(`https://swapi.dev/api/people/`).then((responce) =>
      responce.json().then((data) => {
        console.log(data);
        this.setState((prevState) => ({ ...prevState, persons: data.results }));
      })
    );
  }

  componentDidUpdate(
    prevProps: Readonly<object>,
    prevState: { persons: Person<string>[]; value: string }
  ): void {
    if (prevState.value !== this.state.value) {
      fetch(`https://swapi.dev/api/people/?search=${this.state.value}`).then(
        (responce) =>
          responce.json().then((data) => {
            console.log(data);
            this.setState((prevState) => ({
              ...prevState,
              persons: data.results,
            }));
          })
      );
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
            <div key={person.name}>{person.name}</div>
          ))}
        </div>
      </div>
    );
  }
}
