import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState([]);

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  const calculateResult = () => {
    try {
      const result = eval(currentInput);
      setHistory(prev => [`${currentInput} = ${result}`, ...prev.slice(0, 9)]);
      setCurrentInput(String(result));
    } catch (error) {
      setCurrentInput('Error');
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setCurrentInput('');
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput && !['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
        setCurrentInput(prev => prev + value);
      }
    } else {
      setCurrentInput(prev => prev + value);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display soft-shadow">
          <input
            type="text"
            value={currentInput}
            readOnly
            className="input-field"
            placeholder="0"
          />
        </div>
        
        <div className="buttons-grid">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`button ${btn === '=' ? 'equals' : ''} ${btn === 'C' ? 'clear' : ''} soft-shadow`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="history soft-shadow">
        <div className="history-header">
          <h3>История</h3>
          <button onClick={clearHistory} className="clear-history">
            Очистить
          </button>
        </div>
        <ul>
          {history.map((entry, index) => (
            <li key={index} className="history-item">
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;