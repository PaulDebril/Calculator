import React, { useState } from "react";
import "./Calculator.css";
import { LuAsterisk } from "react-icons/lu";
import { FiDelete } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { add, subtract, multiply, divide } from "../utils/calculator";
import {
  addToHistory,
  clearHistory as resetHistory,
  selectFromHistory,
  HistoryEntry,
} from "../../src/utils/history";

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState("");
  const [prevExpression, setPrevExpression] = useState("");
  const [result, setResult] = useState<string | number>("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleButtonClick = (value: string) => {
    if (isCalculated) {
      if (/[-+*/]/.test(value)) {
        setExpression(String(result) + value);
      } else {
        setExpression(value);
      }
      setResult("");
      setPrevExpression("");
      setIsCalculated(false);
      return;
    }
    const lastChar = expression.slice(-1);
    if (/[-+*/]/.test(lastChar) && /[-+*/]/.test(value)) {
      if (!(value === "-" && lastChar !== "-")) return;
    }
    setExpression((prev) => prev + value);
  };

  const clearAll = () => {
    setExpression("");
    setPrevExpression("");
    setResult("");
    setIsCalculated(false);
  };

  const deleteLast = () => {
    if (isCalculated) {
      setExpression(prevExpression);
      setResult("");
      setPrevExpression("");
      setIsCalculated(false);
    } else {
      setExpression((prev) => prev.slice(0, -1));
    }
  };

  // Cette fonction découpe une expression comme "1+-2*3" en une liste de nombres et d'opérateurs tout en gérant les signes négatifs, ex: ["1", "+", "-2", "*", "3"].
  const tokenize = (expr: string): string[] => {
    const tokens: string[] = [];
    let num = "";
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if ((char >= "0" && char <= "9") || char === ".") {
        num += char;
      } else if (char === "-" && (i === 0 || /[+\-*/]/.test(expr[i - 1]))) {
        // signe négatif attaché au nombre
        num += char;
      } else if (/[+\-*/]/.test(char)) {
        if (num !== "") {
          tokens.push(num);
          num = "";
        }
        tokens.push(char);
      }
    }
    if (num !== "") tokens.push(num);
    return tokens;
  };

  const calculate = () => {
    try {
      const tokens = tokenize(expression);
      if (tokens.length === 0) throw new Error("Expression vide");

      let acc = parseFloat(tokens[0]);
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const next = parseFloat(tokens[i + 1]);
        switch (operator) {
          case "+":
            acc = add(acc, next);
            break;
          case "-":
            acc = subtract(acc, next);
            break;
          case "*":
            acc = multiply(acc, next);
            break;
          case "/":
            acc = next === 0 ? Infinity : divide(acc, next);
            break;
          default:
            throw new Error("Opérateur invalide");
        }
      }
      const finalResult = acc === Infinity ? "∞" : acc;
      setPrevExpression(expression);
      setResult(finalResult);
      setIsCalculated(true);
      setHistory((prev) =>
        addToHistory(prev, { expr: expression, result: finalResult }),
      );
    } catch {
      setPrevExpression(expression);
      setResult("Erreur");
      setIsCalculated(true);
    }
  };

  const clearHistory = () => {
    setHistory(resetHistory());
  };

  const handleHistoryClick = (entry: HistoryEntry) => {
    const restored = selectFromHistory(entry);
    setExpression(restored.expression);
    setPrevExpression(restored.prevExpression);
    setResult(restored.result);
    setIsCalculated(restored.isCalculated);
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-container">
        <div className="calculator-display">
          {result === "" ? (
            <span className="display-input">{expression || "0"}</span>
          ) : (
            <>
              <div className="display-expression">{prevExpression}</div>
              <div className="display-result">{result}</div>
            </>
          )}
        </div>
        <div className="calculator-buttons">
          <button className="calc-btn delete-btn" onClick={clearAll}>
            C
          </button>
          <button className="calc-btn delete-btn" onClick={deleteLast}>
            <FiDelete />
          </button>
          <button
            className="calc-btn operator-btn"
            onClick={() => handleButtonClick("/")}
          >
            /
          </button>
          <button
            className="calc-btn operator-btn"
            onClick={() => handleButtonClick("*")}
          >
            <LuAsterisk />
          </button>

          <button className="calc-btn" onClick={() => handleButtonClick("7")}>
            7
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick("8")}>
            8
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick("9")}>
            9
          </button>
          <button
            className="calc-btn operator-btn"
            onClick={() => handleButtonClick("-")}
          >
            -
          </button>

          <button className="calc-btn" onClick={() => handleButtonClick("4")}>
            4
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick("5")}>
            5
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick("6")}>
            6
          </button>
          <button
            className="calc-btn operator-btn"
            onClick={() => handleButtonClick("+")}
          >
            +
          </button>

          <button className="calc-btn" onClick={() => handleButtonClick("1")}>
            1
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick("2")}>
            2
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick("3")}>
            3
          </button>
          <button
            className="calc-btn operator-btn equal-btn"
            onClick={calculate}
          >
            =
          </button>

          <button
            className="calc-btn zero-btn"
            onClick={() => handleButtonClick("0")}
          >
            0
          </button>
          <button className="calc-btn" onClick={() => handleButtonClick(".")}>
            .
          </button>
        </div>
      </div>
      <div className="calculator-history">
        <button
          className="clear-history-btn"
          onClick={clearHistory}
          aria-label="Vider l'historique"
        >
          <BiTrash />
        </button>
        <h3>Historique</h3>
        <ul>
          {history.map((h, idx) => (
            <li
              key={idx}
              onClick={() => handleHistoryClick(h)}
              className="history-entry"
            >
              <div className="hist-expr">{h.expr}</div>
              <div className="hist-result">{h.result}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
