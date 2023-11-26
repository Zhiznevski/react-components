import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import mockRouter from 'next-router-mock';
import Home from '../../pages/index';
import { renderWithProviders } from '../../tests/test-utils';
import ErrorPage from '../../pages/404';

describe('Test for the 404 Page component:', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    const errorRoute = '/bad/route';
    mockRouter.push(errorRoute);
    renderWithProviders(
      <>
        <Home />
        <ErrorPage />
      </>
    );
    expect(mockRouter.asPath).toEqual('/bad/route');
    expect(screen.getAllByTestId('errorPage')).toBeTruthy();
  });
});
