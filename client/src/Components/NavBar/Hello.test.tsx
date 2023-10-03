import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

describe("Text Inputs", () => {
  test('Text input of type "text" exists',  () => {
     render(<Hello />);
    const textInput = screen.getByText('Hello');
    expect(textInput).toBeInTheDocument();
  });

});


// describe("Text Inputs", () => {
    
//     test('Text input of type "text" exists',  () => {
//       const {getByText} = render(<Hello />);
//       const textInput = getByText('Hello');
//       expect(textInput).toBeInTheDocument();
//     });
  
// });
