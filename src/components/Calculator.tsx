import React, { useState } from 'react';
import './Calculator.css';
import { LuAsterisk } from "react-icons/lu";
import { FiDelete } from "react-icons/fi";
import { add, subtract, multiply, divide } from '../utils/calculator';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | number>('');

  const handleButtonClick = (value: string) => {
    setExpression(prev => prev + value);
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const deleteLast = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      const match = expression.match(/(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)/);
      if (!match) {
        setResult('Erreur');
        return;
      }

      const [, left, operator, right] = match;
      const a = parseFloat(left);
      const b = parseFloat(right);

      let res;
      switch (operator) {
        case '+':
          res = add(a, b);
          break;
        case '-':
          res = subtract(a, b);
          break;
        case '*':
          res = multiply(a, b);
          break;
        case '/':
          res = divide(a, b);
          break;
        default:
          res = 'Erreur';
      }

      setResult(res);
    } catch (err: any) {
      setResult(err.message);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        <span className="display-value">
          {expression} {result !== '' ? `= ${result}` : ''}
        </span>
      </div>

      <div className="calculator-buttons">
        <button className="calc-btn delete-btn" onClick={clear}>C</button>
        <button className="calc-btn delete-btn" onClick={deleteLast}><FiDelete /></button>
        <button className="calc-btn operator-btn" onClick={() => handleButtonClick('/')}>/</button>
        <button className="calc-btn operator-btn" onClick={() => handleButtonClick('*')}><LuAsterisk /></button>

        <button className="calc-btn" onClick={() => handleButtonClick('7')}>7</button>
        <button className="calc-btn" onClick={() => handleButtonClick('8')}>8</button>
        <button className="calc-btn" onClick={() => handleButtonClick('9')}>9</button>
        <button className="calc-btn operator-btn" onClick={() => handleButtonClick('-')}>-</button>

        <button className="calc-btn" onClick={() => handleButtonClick('4')}>4</button>
        <button className="calc-btn" onClick={() => handleButtonClick('5')}>5</button>
        <button className="calc-btn" onClick={() => handleButtonClick('6')}>6</button>
        <button className="calc-btn operator-btn" onClick={() => handleButtonClick('+')}>+</button>

        <button className="calc-btn" onClick={() => handleButtonClick('1')}>1</button>
        <button className="calc-btn" onClick={() => handleButtonClick('2')}>2</button>
        <button className="calc-btn" onClick={() => handleButtonClick('3')}>3</button>
        <button className="calc-btn operator-btn equal-btn" onClick={calculate}>=</button>

        <button className="calc-btn zero-btn" onClick={() => handleButtonClick('0')}>0</button>
        <button className="calc-btn" onClick={() => handleButtonClick('.')}>.</button>
      </div>
    </div>
  );
};

export default Calculator;
