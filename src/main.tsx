import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import Router from './Components/Router/Router';
import { AppProvider } from './Context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={Router} />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
);
