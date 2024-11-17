import React, { useState } from 'react';
import './homepage.css';
import { Clock, Home, User, FileText, Settings, Trophy } from 'lucide-react';
import InteractiveKeyboard from './keyboard';
import TypingGame from './TypingGame';

function QuickkeysInterface() {
  const [selectedTime, setSelectedTime] = useState(30);
  const wordList = `blanket zebra mirror silent rocket banana notebook thunder storm penguin whisper violin paper cactus window blueberry galaxy candle feather marble jungle umbrella pillow sparkle toothpaste lantern dragon steam whisper hunt bloom winter`;

  return (
    <div className="container">
      <header className="header">
        <div className="nav">
          <Settings className="icon" size={20} />
          <Home className="icon" size={20} />
          <User className="icon" size={20} />
          <FileText className="icon" size={20} />
        </div>
        <div className="logo">Quickkeys</div>
        <div className="nav">
          <span>DAILY LEADERBOARDS</span>
          <Trophy className="icon" size={20} />
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
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="textArea">
          <TypingGame words={wordList} gameTime={selectedTime} />
        </div>
        <InteractiveKeyboard />
      </main>
    </div>
  );
}

export default QuickkeysInterface;
