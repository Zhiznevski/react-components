import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../tests/test-utils';
import SearchBar from './SearchBar';

const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event);
};
describe('Tests for the Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SearchBar searchTerm="testText" inputHandler={inputHandler} />
      </BrowserRouter>
    );
    const input = await screen.findByTestId('input');
    const submitBtn = await screen.findByTestId('submit');
    fireEvent.change(input, { target: { value: 'testText' } });
    fireEvent.click(submitBtn);
    const value = window.localStorage.getItem('searchItem_key')!;
    expect(JSON.parse(value)).toBe('testText');
  });
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SearchBar searchTerm="pikachu" inputHandler={inputHandler} />
      </BrowserRouter>
    );
    const submitBtn = await screen.findByTestId('submit');
    fireEvent.click(submitBtn);
    const value = window.localStorage.getItem('searchItem_key')!;
    expect(JSON.parse(value)).toBe('pikachu');
  });
});
