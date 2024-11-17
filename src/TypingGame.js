import React, { useState, useEffect } from 'react';
import './homepage.css';

function TypingGame({ gameTime }) {
  const words =
    "apple banana orange pear grape pineapple watermelon strawberry kiwi mango cherry blueberry dragonfruit lemon lime peach plum raspberry blackberry gooseberry guava fig date apricot papaya grapefruit tangerine persimmon coconut mulberry passionfruit starfruit boysenberry cranberry currant elderberry hackberry avocado cantaloupe mandarin quince pomegranate lychee sapodilla rambutan jackfruit loquat pomelo salak longan breadfruit carambola cherimoya medlar jabuticaba langsat marula pitaya";
  const [wordList, setWordList] = useState(words.split(' '));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState('');
  const [timer, setTimer] = useState(gameTime);
  const [gameRunning, setGameRunning] = useState(false);
  const [wpm, setWpm] = useState(null);

  const startGame = () => {
    setGameRunning(true);
    setTimer(gameTime);
    setTypedLetters('');
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setWpm(null);
  };

  const handleKeyPress = (e) => {
    if (!gameRunning) return;

    const key = e.key;
    const currentWord = wordList[currentWordIndex];
    const currentLetter = currentWord[currentLetterIndex];

    // Check if the key matches the current letter
    if (key === currentLetter) {
      setTypedLetters((prev) => prev + key);
      setCurrentLetterIndex((prev) => prev + 1);

      // Move to the next word if the current word is fully typed
      if (currentLetterIndex === currentWord.length - 1) {
        setCurrentWordIndex((prev) => prev + 1);
        setCurrentLetterIndex(0);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (gameRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setGameRunning(false);
            calculateWPM();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameRunning]);

  useEffect(() => {
    if (gameRunning) {
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, currentWordIndex, currentLetterIndex]);

  const calculateWPM = () => {
    const correctWords = wordList.slice(0, currentWordIndex).filter((word, idx) => {
      return word === typedLetters.split(' ')[idx];
    });
    setWpm((correctWords.length / gameTime) * 60);
  };

  return (
    <div className="typingGame">
      <div className="controls">
        <button onClick={startGame}>Start Game</button>
        <div>Time Left: {timer}s</div>
        {wpm !== null && <div>WPM: {wpm.toFixed(2)}</div>}
      </div>
      <div className="wordsArea">
        {wordList.map((word, idx) => (
          <span
            key={idx}
            className={`word ${
              idx === currentWordIndex ? 'currentWord' : idx < currentWordIndex ? 'completedWord' : ''
            }`}
          >
            {word.split('').map((letter, lIdx) => (
              <span
                key={lIdx}
                className={`letter ${
                  idx === currentWordIndex && lIdx < currentLetterIndex
                    ? 'correctLetter'
                    : idx === currentWordIndex && lIdx === currentLetterIndex
                    ? 'currentLetter'
                    : ''
                }`}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TypingGame;
