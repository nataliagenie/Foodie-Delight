import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import axios from 'axios';

import { mockRandomRecipes } from '../__mocks__/mockData';

jest.mock('axios');
(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockRandomRecipes });

describe("App Test", () => {

  test('shows loading state initially and then removes it', async () => {
    render(<App />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  });

  test('renders navigation bar after loading', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

});

  
  



