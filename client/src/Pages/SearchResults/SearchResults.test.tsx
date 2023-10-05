
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent} from '@testing-library/react';
// import Navbar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';



describe("Section name", () => {
    // Puedes descomentar el siguiente bloque si necesitas un proceso previo para cada prueba.
    /*
    beforeEach(() => {
        render(<Router><Navbar /></Router>);
    });
    */
    describe("SubSection name", () => {
      
        test('test name', () => {
            // Descomenta las siguientes líneas cuando necesites realizar acciones y aserciones.
            /*
            const textBox = screen.queryByRole('textbox');
            if (!textBox) throw new Error("Input of role 'textbox' should exist");
            expect(textBox).toBeInTheDocument();
            */
        });
    });
});
