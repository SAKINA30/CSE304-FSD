import { useState, useEffect } from 'react';/// userState - it is used for managing state in fuctional components.
                                            /// useEffect - it is used for handling side effects like times and api calls

import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date()); /// it is set current time and date to currentTime variable and used setCurrent time function to update it.

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>Welcome to CHARUSAT!!!!</h1>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>
          It is {currentTime.toLocaleDateString()}
        </h2>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>
          It is {currentTime.toLocaleTimeString()}
        </h2>
      </div>
    </>
  );
}

export default App;