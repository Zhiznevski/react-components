import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from './CardList';
import { mockCard } from '../../mocks/Card';

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards', () => {
    render(<CardList cards={[mockCard]}></CardList>);
    expect(screen.getAllByTestId('card').length).toBe(1);
  });
  it('appropriate message is displayed if no cards are present', () => {
    render(<CardList cards={[]}></CardList>);
    expect(
      screen.getByText('No results match your search criteria')
    ).toBeInTheDocument();
  });
});
