import '@/styles/globals.css';
import '@/styles/App.css';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';

export function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
export default wrapper.withRedux(App);
