import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else if (value === '=') {
      try {
        setInput(eval(input).toString()); // unsafe for production
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <span>{input || '0'}</span>
      </div>

      <div className="row">
        <button className="btn op" onClick={() => handleClick('/')}>/</button>
        <button className="btn op" onClick={() => handleClick('')}></button>
        <button className="btn op" onClick={() => handleClick('+')}>+</button>
        <button className="btn op" onClick={() => handleClick('-')}>-</button>
        <button className="btn op" onClick={() => handleClick('DEL')}>DEL</button>
      </div>

      <div className="row">
        <button className="btn" onClick={() => handleClick('1')}>1</button>
        <button className="btn" onClick={() => handleClick('2')}>2</button>
        <button className="btn" onClick={() => handleClick('3')}>3</button>
      </div>

      <div className="row">
        <button className="btn" onClick={() => handleClick('4')}>4</button>
        <button className="btn" onClick={() => handleClick('5')}>5</button>
        <button className="btn" onClick={() => handleClick('6')}>6</button>
      </div>

      <div className="row">
        <button className="btn" onClick={() => handleClick('7')}>7</button>
        <button className="btn" onClick={() => handleClick('8')}>8</button>
        <button className="btn" onClick={() => handleClick('9')}>9</button>
      </div>

      <div className="row">
        <button className="btn" onClick={() => handleClick('0')}>0</button>
        <button className="btn" onClick={() => handleClick('.')}>.</button>
        <button className="btn" onClick={() => handleClick('=')}>=</button>
      </div>
    </div>
  );
}

export default App;