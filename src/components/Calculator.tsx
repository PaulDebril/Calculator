import React from 'react';
import './Calculator.css';

const Calculator: React.FC = () => {
  return (
    <div className="calculator-container">
      <div className="calculator-display">
        <span className="display-value">4,840 + 120 / 30 = 4,844</span>
      </div>

      <div className="calculator-buttons">
        {/* Ligne 1 */}
        <button className="calc-btn delete-btn">C</button>
        <button className="calc-btn delete-btn">Del</button>
        <button className="calc-btn operator-btn">/</button>
        <button className="calc-btn operator-btn">*</button>

        {/* Ligne 2 */}
        <button className="calc-btn">7</button>
        <button className="calc-btn">8</button>
        <button className="calc-btn">9</button>
        <button className="calc-btn operator-btn">-</button>

        {/* Ligne 3 */}
        <button className="calc-btn">4</button>
        <button className="calc-btn">5</button>
        <button className="calc-btn">6</button>
        <button className="calc-btn operator-btn">+</button>

        {/* Ligne 4 */}
        <button className="calc-btn">1</button>
        <button className="calc-btn">2</button>
        <button className="calc-btn">3</button>
        <button className="calc-btn operator-btn">=</button>

        {/* Ligne 5 */}
        <button className="calc-btn zero-btn">0</button>
        <button className="calc-btn">.</button>
      </div>
    </div>
  );
};

export default Calculator;
