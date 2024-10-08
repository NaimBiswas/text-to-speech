import React, { useState } from "react";
import "./App.css";
import useTextToSpeech from "./customHooks/useTextToSpeechHook";

function App() {
  const [text, setText] = useState("");
  const { isSpeaking, speakText, stopSpeech } = useTextToSpeech(); 

  return (
    <div className="app">
      <div className="container">
        <h1>Text to Speech App</h1>
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="controls">
          <button className="speak-btn" onClick={() => speakText(text)} disabled={isSpeaking}>
            {isSpeaking ? "Speaking..." : "Speak"}
          </button>
          <button className="stop-btn" onClick={stopSpeech} disabled={!isSpeaking}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
