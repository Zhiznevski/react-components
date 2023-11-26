import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DetailedCard from '../DetailedCard.tsx/DetailedCard';
import { renderWithProviders } from '../../tests/test-utils';
import Home from '../../pages/index';

describe('Tests for the DetailedCard component', () => {
  it('Check that a detailed card is displayed', async () => {
    renderWithProviders(<DetailedCard details="hgss4-1" />);
    expect(await screen.findByTestId('details')).toBeInTheDocument();
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(<Home />);
    const cards = await screen.findAllByTestId('card');
    fireEvent.click(cards[0]);
    expect(await screen.findByText('180')).toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component', async () => {
    renderWithProviders(<Home />);
    const cards = await screen.findAllByTestId('card');
    fireEvent.click(cards[0]);
    const closeBtn = await screen.findByAltText('close-button');
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });
});
