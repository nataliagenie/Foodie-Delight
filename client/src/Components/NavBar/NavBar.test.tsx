import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
import Navbar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';




describe("NavBar", () => {
  beforeEach(() => {
    render(<Router><Navbar /></Router>);
  })

  describe("Text Input", ()=>{
    test('Text input exists', () => {
      const textBox = screen.queryByRole('textbox');
      if (!textBox) throw new Error("Input of role 'textbox' should exist");
      expect(textBox).toBeInTheDocument();
    });

    test('Text input is of type "text"', () => {
      const textBox = screen.queryByRole('textbox');
      if (!textBox) throw new Error("Input of role 'textbox' should exist");
      expect(textBox).toHaveAttribute('type', 'text');
    });

    test('PlaceHolder === Enter an ingredient', () => {
      const textInput = screen.queryByPlaceholderText('Enter an ingredient');
      if (!textInput) throw new Error("Input with placeholder 'Enter an ingredient' should exist");
      expect(textInput).toBeInTheDocument();
    });
    

})

  describe("Search Button", ()=>{
      test('Search Button Exists',()=>{
        const searchButton = screen.getByText('Search'); 
        expect(searchButton).toBeInTheDocument(); 
    });
    test('When input has text, link should point to /ingredient/{text}',()=>{
      const textBox = screen.getByPlaceholderText('Enter an ingredient');
      const searchButton = screen.getByText('Search');
      
      fireEvent.change(textBox, { target: { value: 'chicken' } }); 
      expect(searchButton).toHaveAttribute('href', '/ingredient/chicken'); 
  });
    test('Search Button points to root when input is empty', () => {
      const searchButton = screen.getByText('Search');
      expect(searchButton).toHaveAttribute('href', '/');
  });

     })

    describe("Navigation Links", ()=>{
      test('"Random Recipe" link exists and points to /random-dish',()=>{
        const link = screen.getByText('Random Recipe'); 
        expect(link).toBeInTheDocument(); 
        expect(link).toHaveAttribute('href', '/random-dish'); 
    });
    test('"My Favorites" link exists and points to /my-favorites',()=>{
    const link = screen.getByText('My Favorites'); 
    expect(link).toBeInTheDocument(); 
    expect(link).toHaveAttribute('href', '/my-favorites'); 
});

});
 });














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
