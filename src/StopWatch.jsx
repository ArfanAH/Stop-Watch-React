import React, { useState, useEffect, useRef } from 'react';

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsed;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = Date.now(); 
  }

  function formatTime() {
    let hours = Math.floor(elapsed / 3600000);
    let minutes = Math.floor((elapsed % 3600000) / 60000);
    let seconds = Math.floor((elapsed % 60000) / 1000);
    let milliseconds = Math.floor(elapsed % 1000 / 10);
  
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');
  
    return `${minutes}:${seconds}:${milliseconds}`;
  }
  

  return (
    <div className='stopwatch'>
      <h1>Stop Watch</h1>
      <div className="display">
        {formatTime()}
      </div>
      <div className="controls">
        <button className='startbtn' onClick={start}>
          ▶️
        </button>
        <button className='stopbtn' onClick={stop}>
          ⏸️
        </button>
        <button className='resetbtn' onClick={reset}>
          🔄
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
