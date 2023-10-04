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





// test -Method (3 arguments) 
 //1- (1. test name) (2. function (expectation to test) to test) (3.timeout (optional) how long to wait, beofre aborting test. default: 5s)
// 2- ("test name")
//  react test library -> render and screen
// 3 -  func -> contain expectation to test   method ->  render()
//  screen  ->Object that contain methods to query (getbytext(argument -> regex)) virtual dom
// 4- toBeInTheDocument() -> matcher function



// react test library -> render && scree
// Method from jest that create react app globally provides -> test expect


// describe -> NO es integration test

// 3 tipos de consultas -> 1. get     2. find    3. query
// 