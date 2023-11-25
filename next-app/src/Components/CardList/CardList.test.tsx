import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from './CardList';
import { MemoryRouter } from 'react-router-dom';
import { mockCard } from '../../mocks/Card';

const page = '1',
  setSearchParams = () => {};

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <CardList
          isLoading={false}
          cards={[mockCard]}
          page={page}
          setSearchParams={setSearchParams}
        />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('card').length).toBe(1);
  });
  it('appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <CardList
          cards={[]}
          isLoading={false}
          page={page}
          setSearchParams={setSearchParams}
        />
      </MemoryRouter>
    );
    expect(
      screen.getByText('No results match your search criteria')
    ).toBeInTheDocument();
  });
});
