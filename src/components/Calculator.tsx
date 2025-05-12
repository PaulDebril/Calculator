import React, { useState } from 'react';
import './Calculator.css';
import { LuAsterisk } from 'react-icons/lu';
import { FiDelete } from 'react-icons/fi';
import { add, subtract, multiply, divide } from '../utils/calculator';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [prevExpression, setPrevExpression] = useState('');
  const [result, setResult] = useState<string | number>('');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleButtonClick = (value: string) => {
    if (isCalculated) {
      if (/[-+*/]/.test(value)) {
        setExpression(() => String(result) + value);
        setResult('');
        setIsCalculated(false);
      } else {
        setExpression(value);
        setResult('');
        setIsCalculated(false);
      }
      return;
    }

    const lastTwo = expression.slice(-2);
    if (/[-+*/]$/.test(expression) && /[-+*/]/.test(value)) {
      if (!(value === '-' && !/[-+*/]-$/.test(lastTwo))) return;
    }

    setExpression(prev => prev + value);
  };

  const clearAll = () => {
    setExpression('');
    setPrevExpression('');
    setResult('');
    setIsCalculated(false);
  };

  const deleteLast = () => {
    if (isCalculated) {
      setExpression(prevExpression);
      setResult('');
      setIsCalculated(false);
    } else {
      setExpression(prev => prev.slice(0, -1));
    }
  };

  const calculate = () => {
    try {
      const match = expression.match(/(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)/);
      if (!match) {
        setResult('Erreur');
        setIsCalculated(true);
        return;
      }
      const [, left, operator, right] = match;
      const a = parseFloat(left);
      const b = parseFloat(right);
      let res: number | string;

      switch (operator) {
        case '+': res = add(a, b); break;
        case '-': res = subtract(a, b); break;
        case '*': res = multiply(a, b); break;
        case '/': res = b === 0 ? '∞' : divide(a, b); break;
        default: res = 'Erreur';
      }

      setPrevExpression(expression);
      setResult(res);
      setIsCalculated(true);
    } catch {
      setResult('Erreur');
      setIsCalculated(true);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-display">
        {result === '' ? (
          <span className="display-input">{expression || '0'}</span>
        ) : (
          <>
            <div className="display-expression">{prevExpression}</div>
            <div className="display-result">{result}</div>
          </>
        )}
      </div>

      <div className="calculator-buttons">
        <button className="calc-btn delete-btn" onClick={clearAll}>C</button>
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
