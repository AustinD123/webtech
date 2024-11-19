import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./App.css";

import { Clock, Home, User, FileText, Settings, Trophy, NavigationIcon } from 'lucide-react';
import InteractiveKeyboard from './keyboard';
import {
  ONE_SECOND, KEYCODE_BACKSPACE, KEYCODE_ENTER, PROGRESS_RING_STROKE, PROGRESS_RING_RADIUS
} from "./utils/constants";
import {
  getStats, getHighlightClass, getCharByCode, getProgress, getInitialGameState, isUnusedKeyPress, getElapsedTime
} from "./utils/helpers";
import axios from 'axios';
import { EmailContext } from './components/EmailContext';

import Title from "./components/title";
import Stats from "./components/stats";
import Prompt from "./components/prompt";
import ProgressRing from './components/progress-ring';
import App from "./components/App";

import Navigation from "./navigation";
function App1() {
  const typingArea = useRef(null);
  const [gameState, setGameState] = useState(getInitialGameState());
  const [timeElapsedInMs, setTimeElapsedInMs] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedTime, setSelectedTime] = useState(120);
  const intervalRef = useRef(null);
  const timeAtStartRef = useRef(null);
  const { email } = useContext(EmailContext); // Access email from context
  const [wpm, setWpm] = useState(0);

  const handleStoreWpm = () => {
    if (email) {
      axios.post('http://localhost:3001/store-wpm', { email, wpm })
        .then(response => console.log("WPM stored:", response.data))
        .catch(error => console.error("Error storing WPM:", error));
    } else {
      console.error("User email not found");
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasStartedTyping && !isFinished) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      timeAtStartRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMs = currentTime - timeAtStartRef.current;

        if (elapsedMs >= selectedTime * 1000) {
          clearInterval(intervalRef.current);
          setIsFinished(true);
          setTimeElapsedInMs(selectedTime * 1000);
        } else {
          setTimeElapsedInMs(elapsedMs);
        }
      }, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [hasStartedTyping, isFinished, selectedTime]);

  const handleTimeSelection = (time) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSelectedTime(time);
    setGameState(getInitialGameState());
    setTimeElapsedInMs(0);
    setHasStartedTyping(false);
    setIsFinished(false);
    timeAtStartRef.current = null;
  };

  const { typingPrompt, correctEntries, incorrectEntries, isCorrectSequence, keyStrokeCount } = gameState;

  const { wpm: calculatedWpm, accuracy } = getStats({
    timeElapsedInMs, correctEntries, incorrectEntries, keyStrokeCount
  });

  const progress = getProgress({ timeElapsedInMs, isFinished, selectedTime });
  const highlightClass = getHighlightClass({ isCorrectSequence, isFinished });

  useEffect(() => {
    setWpm(calculatedWpm);
  }, [calculatedWpm]);

  const handleOnKeyPress = ({ charCode }) => {
    if (isUnusedKeyPress({ charCode, isFinished })) {
      return;
    }

    if (isFinished) {
      if (charCode === KEYCODE_ENTER) {
        setGameState(getInitialGameState());
        setIsFinished(false);
        setTimeElapsedInMs(0);
        setHasStartedTyping(false);
      }
      return;
    }

    if (!hasStartedTyping) {
      if (charCode === typingPrompt.charCodeAt(0)) {
        setHasStartedTyping(true);
      }
    }

    if (charCode === typingPrompt.charCodeAt(0) && isCorrectSequence) {
      setGameState({
        ...gameState,
        correctEntries: [...correctEntries, typingPrompt[0]],
        typingPrompt: typingPrompt.substring(1),
        isCorrectSequence: true,
        keyStrokeCount: keyStrokeCount + 1,
      });

      if (typingPrompt.substring(1).length < 1) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsFinished(true);
      }
    } else {
      setGameState({
        ...gameState,
        incorrectEntries: [...incorrectEntries, getCharByCode(charCode)],
        isCorrectSequence: false,
        keyStrokeCount: keyStrokeCount + 1,
      });
    }
  };
  
  
  const handleOnKeyDown = ({ keyCode }) => {
    if (isFinished) {
      return;
    }

    if (keyCode === KEYCODE_BACKSPACE) {
      const hasIncorrectEntries = incorrectEntries.length > 0;
      const hasCorrectEntries = correctEntries.length > 0;

      if (hasIncorrectEntries) {
        setGameState({
          ...gameState,
          incorrectEntries: incorrectEntries.slice(0, -1),
          isCorrectSequence: incorrectEntries.length <= 1,
        });
      } else if (hasCorrectEntries) {
        const updatedCorrectEntries = correctEntries.slice(0, -1);
        const updatedTypingPrompt = [
          correctEntries[correctEntries.length - 1],
          ...typingPrompt,
        ].join(" ");

        setGameState({
          ...gameState,
          correctEntries: updatedCorrectEntries,
          typingPrompt: updatedTypingPrompt,
        });
      }
    }
  };

  const handleClick = () => {
    typingArea.current.focus();
  };

  return (
    <div onClick={handleClick} className="app">
      <input
        ref={typingArea}
        className="typing-area"
        onKeyPress={handleOnKeyPress}
        onKeyDown={handleOnKeyDown}
        type="text"
        autoFocus
      />
      <div className="app-container">
        <Title />
        <Prompt
          correctEntries={correctEntries}
          typingPrompt={typingPrompt}
          incorrectEntries={incorrectEntries}
          highlightClass={highlightClass}
          hasStartedTyping={hasStartedTyping}
          isFinished={isFinished}
        />
        <div className="row">
          <div className="column mt-10-negative">
            <ProgressRing
              hasStartedTyping={hasStartedTyping}
              isFinished={isFinished}
              stroke={PROGRESS_RING_STROKE}
              radius={PROGRESS_RING_RADIUS}
              progress={progress}
            />
          </div>
          {isFinished && (
            <div className="column">
              <Stats
                hasStartedTyping={hasStartedTyping}
                isFinished={isFinished}
                wpm={wpm}
                accuracy={accuracy}
              />
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <header className="header">
          <div className="nav">
            
          <Navigation/>
            
          </div>
        </header>

        <main className="mainContent">
          <div className="controlPanel">
            <button className="customizeButton">CUSTOMIZE</button>
            <div className="timeControls">
              <Clock size={16} />
              {[15, 30, 60, 120].map((time) => (
                <button
                  key={time}
                  className={`timeButton ${selectedTime === time ? 'selectedTime' : ''}`}
                  onClick={() => handleTimeSelection(time)}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>
          <InteractiveKeyboard />
        </main>
      </div>
    </div>
  );
}

export default App1;
