import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import Router from './Components/Router/Router';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={Router} />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
