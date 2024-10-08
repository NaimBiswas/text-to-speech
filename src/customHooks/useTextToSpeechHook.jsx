import { useState } from "react";

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text) => {
    if (text.trim() !== "") {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      // Split text into smaller chunks if it's too long
      const chunks = text.match(/.{1,200}/g); // Split into chunks of 200 characters
      let index = 0;

      const speakNextChunk = () => {
        if (index < chunks.length) {
          utterance.text = chunks[index++];
          window.speechSynthesis.speak(utterance);
        }
      };

      // Speak the next chunk when the current one ends
      utterance.onend = () => {
        speakNextChunk();
      };

      speakNextChunk(); // Start speaking the first chunk
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return { isSpeaking, speakText, stopSpeech };
};

export default useTextToSpeech;
