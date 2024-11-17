import React, { useState, useEffect } from "react";
import "./keyboard.css"; // Ensure your styles are in this CSS file

function App() {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  const handleKeyDown = (event) => {
    setPressedKeys((prev) => new Set(prev).add(event.code));
  };

  const handleKeyUp = (event) => {
    setPressedKeys((prev) => {
      const updatedKeys = new Set(prev);
      updatedKeys.delete(event.code);
      return updatedKeys;
    });
  };

  useEffect(() => {
    // Attach event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const renderKey = (keyCode, label) => {
    const isPressed = pressedKeys.has(keyCode);
    return (
      <div
        className={`key ${isPressed ? "pressed" : ""}`}
        id={keyCode}
        key={keyCode}
        style={keyCode === "Space" ? { width: "300px" } : {}}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="keyboard">
      {/* First Row */}
      <div className="key-row">
        {renderKey("Digit1", "1!")}
        {renderKey("Digit2", "2@")}
        {renderKey("Digit3", "3#")}
        {renderKey("Digit4", "4$")}
        {renderKey("Digit5", "5%")}
        {renderKey("Digit6", "6^")}
        {renderKey("Digit7", "7&")}
        {renderKey("Digit8", "8*")}
        {renderKey("Digit9", "9(")}
        {renderKey("Digit0", "0)")}
        {renderKey("Back", "Back")}
      </div>

      {/* Second Row */}
      <div className="key-row">
        {renderKey("Tab", "Tab")}
        {renderKey("KeyQ", "Q")}
        {renderKey("KeyW", "W")}
        {renderKey("KeyE", "E")}
        {renderKey("KeyR", "R")}
        {renderKey("KeyT", "T")}
        {renderKey("KeyY", "Y")}
        {renderKey("KeyU", "U")}
        {renderKey("KeyI", "I")}
        {renderKey("KeyO", "O")}
        {renderKey("KeyP", "P")}
      </div>

      {/* Third Row */}
      <div className="key-row">
        {renderKey("CapsLock", "Caps Lock")}
        {renderKey("KeyA", "A")}
        {renderKey("KeyS", "S")}
        {renderKey("KeyD", "D")}
        {renderKey("KeyF", "F")}
        {renderKey("KeyG", "G")}
        {renderKey("KeyH", "H")}
        {renderKey("KeyJ", "J")}
        {renderKey("KeyK", "K")}
        {renderKey("KeyL", "L")}
        {renderKey("Enter", "Enter")}
      </div>

      {/* Fourth Row */}
      <div className="key-row">
        {renderKey("ShiftLeft", "Shift")}
        {renderKey("KeyZ", "Z")}
        {renderKey("KeyX", "X")}
        {renderKey("KeyC", "C")}
        {renderKey("KeyV", "V")}
        {renderKey("KeyB", "B")}
        {renderKey("KeyN", "N")}
        {renderKey("KeyM", "M")}
        {renderKey("ShiftRight", "Shift")}
      </div>

      {/* Space Bar */}
      <div className="key-row">
        {renderKey("Space", "Space")}
      </div>
    </div>
  );
}

export default App;
