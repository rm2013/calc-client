import React, { useState } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [theme, setTheme] = useState('light'); // New state for theme switching

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const appendInput = (value) => {
        setInput(input + value);
    };

    const calculateResult = () => {
        try {
            // Check if the input is for scientific calculations
            if (input.includes('sin') || input.includes('cos') || input.includes('log')) {
                evaluateScientificFunction();
            } else {
                // This pattern matches numbers (including decimal points) and operators
                const tokens = input.split(/([+\-*/])/).filter(Boolean);
                let result = parseFloat(tokens[0]);

                for (let i = 1; i < tokens.length; i += 2) {
                    const operator = tokens[i];
                    const nextValue = parseFloat(tokens[i + 1]);

                    switch (operator) {
                        case '+':
                            result += nextValue;
                            break;
                        case '-':
                            result -= nextValue;
                            break;
                        case '*':
                            result *= nextValue;
                            break;
                        case '/':
                            if (nextValue === 0) {
                                setInput('Cannot divide by zero');
                                return;
                            }
                            result /= nextValue;
                            break;
                        default:
                            // Handle unexpected operators or syntax errors
                            setInput('Error');
                            return;
                    }
                }

                setInput(result.toString());
            }
        } catch (error) {
            setInput("Error");
        }
    };

    const evaluateScientificFunction = () => {
        try {
            const num = parseFloat(input.match(/[\d.]+$/)[0]);  // Extracts the last number for the operation
            if (input.startsWith('sin')) {
                setInput(Math.sin(num * Math.PI / 180).toFixed(2).toString());
            } else if (input.startsWith('cos')) {
                setInput(Math.cos(num * Math.PI / 180).toFixed(2).toString());
            } else if (input.startsWith('log')) {
                if (num <= 0) {
                    setInput('Input must be greater than zero');
                    return;
                }
                setInput(Math.log10(num).toFixed(2).toString());
            }
        } catch (error) {
            setInput("Invalid input for scientific calculation");
        }
    };

    return (
        <div className={`calculator-container ${theme}`}>
            <button onClick={toggleTheme}>Switch Theme</button>
            <input type="text" value={input} readOnly className="calculator-input" />
            <div>
                <button className="calculator-button" onClick={() => appendInput('1')}>1</button>
                <button className="calculator-button" onClick={() => appendInput('2')}>2</button>
                <button className="calculator-button" onClick={() => appendInput('3')}>3</button>
                <button className="calculator-button"onClick={() => appendInput('4')}>4</button>
                <button className="calculator-button" onClick={() => appendInput('5')}>5</button>
                <button className="calculator-button" onClick={() => appendInput('6')}>6</button>
                <button className="calculator-button" onClick={() => appendInput('7')}>7</button>
                <button className="calculator-button" onClick={() => appendInput('8')}>8</button>
                <button className="calculator-button" onClick={() => appendInput('9')}>9</button>
                <button className="calculator-button" onClick={() => appendInput('0')}>0</button>
                <button className="calculator-button" onClick={() => appendInput('+')}>+</button>
                <button className="calculator-button" onClick={() => appendInput('-')}>-</button>
                <button className="calculator-button" onClick={() => appendInput('*')}>*</button>
                <button className="calculator-button" onClick={() => appendInput('/')}>/</button>
                <button className="calculator-button" onClick={() => appendInput('sin')}>sin</button>
                <button className="calculator-button" onClick={() => appendInput('cos')}>cos</button>
                <button className="calculator-button" onClick={() => appendInput('log')}>log</button>
                <button className="calculator-button" onClick={() => calculateResult()}>=</button>
                <button className="calculator-button clear-button" onClick={() => setInput('')}>Clear</button>
            </div>
        </div>
    );
};

export default Calculator;

