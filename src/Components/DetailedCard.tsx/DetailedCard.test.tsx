import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import DetailedCard from '../DetailedCard.tsx/DetailedCard';
import { renderWithProviders } from '../../tests/test-utils';

describe('Tests for the DetailedCard component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<DetailedCard />} />
          </Route>
        </Routes>
        <App />
      </MemoryRouter>
    );
    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);
    expect(await screen.findByTestId('loader')).toBeInTheDocument();
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<DetailedCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const cards = await screen.findAllByTestId('card');
    fireEvent.click(cards[0]);
    expect(await screen.findByText('180')).toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<DetailedCard />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const cards = await screen.findAllByTestId('card');
    fireEvent.click(cards[0]);
    const closeBtn = await screen.findByAltText('close-button');
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });
});
