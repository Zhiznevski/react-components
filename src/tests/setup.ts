import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './server';

beforeAll(() => {
  server.listen();
  vi.mock('next/router', () => require('next-router-mock'));
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

afterEach(() => {
  cleanup();
});
