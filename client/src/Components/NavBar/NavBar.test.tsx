import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';


describe("Text Inputs", () => {
  beforeEach(() => {
    render(<Router><Navbar /></Router>);
  });
  test('Text input of type "text" exists',  () => {
    
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();
  });
  test('PlaceHolder === Enter an ingredient',  () => {
    const textInput = screen.getByPlaceholderText('Enter an ingredient');
    expect(textInput).toBeInTheDocument();
  });


});




// const textInput = screen.getByPlaceholderText('Enter an ingredient');
// expect(textInput).toBeInTheDocument();












// fireEvent 

// Que existe input
// Que exista boton
// que tenga cierto tamanao? 
// Que tenga cierto nombre?
// Que tenga cierto color
// Que acepte x arguemtnos?




//  expect(wrapper.find(BorderlessButton)).toHaveLength(1);


  
    // Enter valid information and submit form
    // userEvent.type(
    //     screen.getByRole('textbox', { name: /first name/i }),
    //     address.firstName
    //   );
    //   userEvent.type(
    //     screen.getByRole('textbox', { name: /last name/i }),
    //     address.lastName
    //   );
