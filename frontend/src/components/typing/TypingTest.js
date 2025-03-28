import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './TypingTest.css';

const TypingTest = () => {
  // Sample paragraphs for typing test
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet. It is commonly used for typing practice and font display.",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages.",
    "The Internet is a global network of computers that works much like the postal system, only at sub-second speeds. Just as the postal service enables people to send one another envelopes containing messages, the Internet enables computers to send one another small packets of digital data."
  ];

  // State variables
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(15); // 15 or 30 seconds
  const [timerMode, setTimerMode] = useState(15); // 15 or 30 seconds
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  
  const inputRef = useRef(null);

  // Initialize with random paragraph
  useEffect(() => {
    setText(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      endTest();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timer]);

  // Start the test
  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    inputRef.current.focus();
  };

  // End the test and calculate results
  const endTest = () => {
    setIsActive(false);
    
    // Calculate WPM and accuracy
    const words = userInput.trim().split(' ').length;
    const characters = userInput.length;
    const timeInMinutes = (Date.now() - startTime) / 60000; // Convert ms to minutes
    
    const wpm = Math.round(words / timeInMinutes);
    const accuracy = Math.round(((characters - errors) / characters) * 100);
    
    setResults({
      wpm,
      accuracy,
      errors,
      characters,
      words
    });
    
    // Save results to backend if user is authenticated
    saveResults(wpm, accuracy, errors);
  };

  // Save results to backend
  const saveResults = async (wpm, accuracy, totalErrors) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('User not authenticated. Results not saved.');
      return;
    }
    
    try {
      await axios.post('https://monkettypeclone.onrender.com/api/sessions', {
        wpm,
        accuracy,
        totalErrors
      }, {
        headers: { 'x-auth-token': token }
      });
      
      console.log('Results saved successfully');
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  // Handle user input
  const handleInput = (e) => {
    if (!isActive) {
      startTest();
    }
    
    const value = e.target.value;
    setUserInput(value);
    
    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
  };

  // Reset the test
  const resetTest = () => {
    setText(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
    setUserInput('');
    setTimer(timerMode);
    setIsActive(false);
    setResults(null);
    setErrors(0);
  };

  // Change timer mode
  const changeTimerMode = (mode) => {
    setTimerMode(mode);
    setTimer(mode);
  };

  // Render character with highlighting
  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = '';
      
      if (index < userInput.length) {
        className = userInput[index] === char ? 'correct' : 'incorrect';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-test">
      <div className="timer-options">
        <button 
          className={timerMode === 15 ? 'active' : ''} 
          onClick={() => changeTimerMode(15)}
          disabled={isActive}
        >
          15s
        </button>
        <button 
          className={timerMode === 30 ? 'active' : ''} 
          onClick={() => changeTimerMode(30)}
          disabled={isActive}
        >
          30s
        </button>
      </div>
      
      <div className="timer">Time left: {timer}s</div>
      
      {!results ? (
        <>
          <div className="text-display">{renderText()}</div>
          
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInput}
            disabled={timer === 0}
            placeholder="Start typing..."
          />
          
          {!isActive && timer === timerMode && (
            <button onClick={startTest}>Start Test</button>
          )}
        </>
      ) : (
        <div className="results">
          <h2>Results</h2>
          <p>WPM: {results.wpm}</p>
          <p>Accuracy: {results.accuracy}%</p>
          <p>Errors: {results.errors}</p>
          <button onClick={resetTest}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
