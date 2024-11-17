import {
  ONE_MINUTE,
  APPROX_WORD_LENGTH,
  KEYCODE_SPACEBAR,
  KEYCODE_ENTER,
} from "./constants";

import { getText } from "../services/text";

export const getStats = ({
  timeElapsedInMs,
  correctEntries,
  incorrectEntries,
  keyStrokeCount,
}) => {
  const correctEntriesCount = correctEntries.length;
  const incorrectEntriesCount = incorrectEntries.length;
  const timeElapsedInMin = timeElapsedInMs / ONE_MINUTE;

  const grossWpm = keyStrokeCount / APPROX_WORD_LENGTH / timeElapsedInMin;

  const wpm = (grossWpm - incorrectEntriesCount / timeElapsedInMin).toFixed();
  const accuracy = ((correctEntriesCount / keyStrokeCount) * 100).toFixed();

  return {
    wpm: isFinite(wpm) && wpm > 0 ? wpm : null,
    accuracy: isFinite(accuracy) ? accuracy : null,
  };
};

export const getHighlightClass = ({ isCorrectSequence, isFinished }) => {
  if (isFinished) {
    return "highlight-finished";
  }

  if (isCorrectSequence) {
    return "highlight-correct";
  }

  return "highlight-warning";
};

export const getCharByCode = (charCode) => {
  if (charCode === KEYCODE_SPACEBAR) {
    return "_";
  }
  return String.fromCharCode(charCode);
};

export const getProgress = ({ timeElapsedInMs, isFinished, selectedTime }) => {
  if (isFinished) {
    return selectedTime; // Return the full selected time as progress when finished
  }

  // Convert selected time from seconds to milliseconds
  const totalTime = selectedTime * 1000;
  
  // Calculate elapsed time as a fraction of the selected time
  const elapsedFraction = timeElapsedInMs / totalTime;

  // Convert to the corresponding value in the range of [0, selectedTime]
  return (elapsedFraction * selectedTime).toFixed(2);
};


export const isUnusedKeyPress = ({ charCode, isFinished }) => {
  if (charCode === KEYCODE_ENTER && !isFinished) {
    return true;
  }
  return false;
};

export const getInitialGameState = () => {
  const text = getText();

  const initialGameState = {
    typingPrompt: text,
    correctEntries: [],
    incorrectEntries: [],
    isCorrectSequence: true,
    keyStrokeCount: 0,
    typingPromptLength: text.length,
  };

  return initialGameState;
};

export const getElapsedTime = (start) => {
  return new Date() - start;
};