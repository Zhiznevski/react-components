import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from './CardList';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { CHARACTERS } from '../../mockData/Characters';

const limit = 20,
  page = '1',
  setSearchParams = () => {};

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards', () => {
    const providerProps = {
      persons: CHARACTERS,
      setPersons: () => {},
      searchValue: '',
      setSearchValue: () => {},
    };
    const { container } = render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <CardList
            limit={limit}
            page={page}
            setSearchParams={setSearchParams}
          />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(container.querySelectorAll('.card').length).toBe(3);
  });
  it('render', () => {
    const providerProps = {
      persons: [],
      setPersons: () => {},
      searchValue: 'rick',
      setSearchValue: () => {},
    };
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <CardList
            limit={limit}
            page={page}
            setSearchParams={setSearchParams}
          />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText('No results match your search criteria')
    ).toBeDefined();
  });
});
