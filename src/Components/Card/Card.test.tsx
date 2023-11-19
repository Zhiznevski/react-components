import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Card from './Card';
import App from '../../App';
import DetailedCard from '../DetailedCard.tsx/DetailedCard';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { mockCard } from '../../mocks/Card';
import { renderWithProviders } from '../../tests/test-utils';

const page = '1';
const setSearchParams = () => {};

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card setSearchParams={setSearchParams} page={page} card={mockCard} />
        </Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: 'Venusaur-EX' })
    ).toBeInTheDocument();
    expect(screen.getByText('Pokémon')).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<DetailedCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);

    const detailsCard = await screen.findAllByTestId('details');
    expect(detailsCard[0]).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<DetailedCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);
    expect(await screen.findByText('HP')).toBeInTheDocument();
  });
});
