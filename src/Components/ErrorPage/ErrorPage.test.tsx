import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../../App';
import ErrorPage from './ErrorPage';

describe('Test for the 404 Page component:', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    const errorRoute = '/bad/route';
    render(
      <MemoryRouter initialEntries={[errorRoute]}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
