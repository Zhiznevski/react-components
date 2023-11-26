import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from './Loading';

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(<Loading />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
});
