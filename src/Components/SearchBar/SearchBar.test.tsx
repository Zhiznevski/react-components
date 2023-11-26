import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../tests/test-utils';
import SearchBar from './SearchBar';

describe('Tests for the Search component', () => {
  it('Search is displayed when page is mounting', async () => {
    renderWithProviders(<SearchBar />);
    const input = await screen.findByTestId('input');
    expect(input).toBeInTheDocument();
  });
});
