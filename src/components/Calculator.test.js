import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
    test('performs addition', () => {
        render(<Calculator />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '5 3' } });
        fireEvent.click(screen.getByText('Add'));
        expect(screen.getByText('Result: 8')).toBeInTheDocument();
    });

    test('handles division by zero', () => {
        render(<Calculator />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '8 0' } });
        fireEvent.click(screen.getByText('Divide'));
        expect(screen.getByText('Result: Cannot divide by zero')).toBeInTheDocument();
    });

    test('calculates sine of 30 degrees', () => {
        render(<Calculator />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '30' } });
        fireEvent.click(screen.getByText('Sine'));
        expect(screen.getByText('Result: 0.50')).toBeInTheDocument();
    });
});


