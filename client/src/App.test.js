import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * @jest-environment jsdom
 */

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/foodie/i);
  expect(linkElement).toBeInTheDocument();
});
