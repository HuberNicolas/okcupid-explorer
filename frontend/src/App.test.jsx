import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('renders the landing page', () => {
  render(<App />);
  expect(screen.getByText('Welcome to Project Eros!')).toBeInTheDocument();
});
