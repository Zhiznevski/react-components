import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from './Logo';

describe('Tests for the Card component', () => {
  it('Renders the relevant card data', () => {
    render(<Logo />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
