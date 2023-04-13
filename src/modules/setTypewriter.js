const TIME_PER_CHARACTER = 50;

export const speakText = (message) => {
  const tts = new SpeechSynthesisUtterance(message);
  tts.rate = 1.2;
  tts.pitch = 1.2;
  speechSynthesis.speak(tts);
};

export const setTypewriter = (message, container) => {
  // speakText(message);

  const setText = (message) => (container.textContent = message);

  for (let pos = 0; pos < message.length + 1; pos++) {
    const time = pos * TIME_PER_CHARACTER;
    setTimeout(() => setText(message.substring(0, pos)), time);
  }
};
