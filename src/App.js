import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useComlink } from './hooks/useComlink';

function App() {
  const [count, setCount] = useState(0);
  const { worker } = useComlink(new Worker('./worker.js', { type: 'module' }));
  useEffect(() => {
    if (worker) {
      const init = async () => {
        try {
          let n = await worker.counter;
          setCount(n);
        } catch (err) {
          console.log(err);
        }
      };
      init();
    }
  }, [worker]);
  const inc = async () => {
    try {
      await worker.inc();
      let n = await worker.counter;
      setCount(n);
    } catch (err) {
      console.log(err);
    }
  };
  const dec = async () => {
    try {
      await worker.dec();
      let n = await worker.counter;
      setCount(n);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={dec}>-</button>
        <h3>{count}</h3>
        <button onClick={inc}>+</button>
      </header>
    </div>
  );
}

export default App;
