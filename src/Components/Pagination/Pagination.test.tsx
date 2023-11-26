import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../tests/test-utils';
import Pagination from './Pagination';
import mockRouter from 'next-router-mock';

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    renderWithProviders(<Pagination pageCount={10} />);
    const nextBtn = await screen.findByTestId('nextBtn');
    fireEvent.click(nextBtn);
    expect(mockRouter.query.page).toBe(2);
    fireEvent.click(nextBtn);
    expect(mockRouter.query.page).toBe(3);
    fireEvent.click(nextBtn);
    expect(mockRouter.query.page).toBe(4);
  });
});
