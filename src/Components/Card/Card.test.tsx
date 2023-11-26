import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import { mockCard } from '../../mocks/Card';
import { renderWithProviders } from '../../tests/test-utils';
import Home from '../../pages/index';

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(<Card card={mockCard} />);
    expect(
      screen.getByRole('heading', { name: 'Venusaur-EX' })
    ).toBeInTheDocument();
    expect(screen.getByText('Pokémon')).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(<Home />);
    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);
    const detailsCard = await screen.findAllByTestId('details');
    expect(detailsCard[0]).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderWithProviders(<Home />);
    const card = await screen.findAllByTestId('card');
    fireEvent.click(card[0]);
    expect(await screen.findByText('HP')).toBeInTheDocument();
  });
});
