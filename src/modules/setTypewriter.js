import { getAvatar } from "./getAvatar.js";

const TIME_PER_CHARACTER = 50;

export const speakText = (message) => {
  const tts = new SpeechSynthesisUtterance(message);
  tts.rate = 1.2;
  tts.pitch = 1.2;
  speechSynthesis.speak(tts);
};

export const setTypewriter = (data, container) => {
  // speakText(message);

  const usernameDialog = container.querySelector(".dialog.username");
  const botDialog = container.querySelector(".dialog.bot");

  const { username, usernameMessage, message } = data;
  const avatar = getAvatar(username);
  avatar.then(url => {
    const img = usernameDialog.querySelector("img.avatar");
    img.src = url;
    img.alt = username;
  });

  usernameDialog.querySelector(".name").textContent = username;
  usernameDialog.querySelector(".message").textContent = usernameMessage;

  const setText = (message) => (botDialog.querySelector(".message").textContent = message);

  for (let pos = 0; pos < message.length + 1; pos++) {
    const time = pos * TIME_PER_CHARACTER;
    setTimeout(() => setText(message.substring(0, pos)), time);
  }
};
