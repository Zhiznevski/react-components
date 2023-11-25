import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import DetailedCard from '../DetailedCard.tsx/DetailedCard';
import { renderWithProviders } from '../../tests/test-utils';

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<DetailedCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    const nextBtn = await screen.findByTestId('nextBtn');
    fireEvent.click(nextBtn);
    expect(window.location.search.includes('page=2')).not.toBeNull();
  });
});
