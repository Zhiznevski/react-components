import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Mock, describe, expect, it } from 'vitest';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { CHARACTERS } from '../../mockData/Characters';
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

const mockContextValue = ['1', '1', () => {}];

describe('Tests for the DetailedCard component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<DetailedCard />} />
            </Route>
          </Routes>
          <App />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const card = await screen.findAllByTestId('card');
    act(() => {
      fireEvent.click(card[0]);
    });

    waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <Routes>
            <Route path="/" element={<Outlet context={mockContextValue} />}>
              <Route index element={<DetailedCard />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Male')).toBeInTheDocument();
    expect(await screen.findByText('Alive')).toBeInTheDocument();
    expect(await screen.findByText('Human')).toBeInTheDocument();
    expect(await screen.findByText('unknown')).toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={{ ...providerProps }}>
          <Routes>
            <Route path="/" element={<Outlet context={mockContextValue} />}>
              <Route index element={<DetailedCard />} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    const closeBtn = await screen.findByAltText('close-button');
    act(() => {
      fireEvent.click(closeBtn);
    });
    waitFor(() => expect(screen.getByTestId('details')).toBeInTheDocument());
  });
});
