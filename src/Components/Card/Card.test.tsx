import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { CHARACTERS } from '../../mockData/Characters';
import Card from './Card';
import App from '../../App';
import DetailedCard from '../DetailedCard.tsx/DetailedCard';

global.fetch = vi.fn(createFetchResponse) as Mock;

function createFetchResponse() {
  return { json: () => new Promise((resolve) => resolve(CHARACTERS[0])) };
}

const providerProps = {
  persons: CHARACTERS,
  setPersons: () => {},
  searchValue: '',
  setSearchValue: () => {},
};
const page = '1';
const setSearchParams = () => {};

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <Card
            setSearchParams={setSearchParams}
            page={page}
            character={CHARACTERS[1]}
          />
        </AppContext.Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: 'Morty Smith' })
    ).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<DetailedCard />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);

    const detailsCard = await screen.findAllByTestId('details');
    expect(detailsCard[0]).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <Card
            setSearchParams={setSearchParams}
            page={page}
            character={CHARACTERS[0]}
          />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);
    expect(fetch).toHaveBeenCalled();
  });
});
