import '@/styles/globals.css';
import '@/styles/App.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...props.pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
