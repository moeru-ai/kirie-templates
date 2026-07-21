import { onTextReceived, sendText } from "@gd-kirie/ipc";

import "./style.css";

interface WebMessage {
  type: "web_ping" | "web_ready";
  payload: {
    source: "web";
  };
}

const logNodeElement = document.querySelector<HTMLPreElement>("#log");
const sendButtonElement = document.querySelector<HTMLButtonElement>("#sendButton");
if (!logNodeElement || !sendButtonElement) {
  throw new Error("Missing Kirie basic UI.");
}

const logNode = logNodeElement;
const sendButton = sendButtonElement;

function appendLog(line: string): void {
  logNode.textContent = `${logNode.textContent}\n${line}`;
  console.log(line);
}

function postToGodot(message: WebMessage): void {
  const messageText = JSON.stringify(message);

  try {
    sendText(messageText);
    appendLog(`Sent text to Godot: ${messageText}`);
  } catch (error) {
    appendLog(error instanceof Error ? error.message : "Kirie native bridge is unavailable");
  }
}

onTextReceived((messageText) => {
  appendLog(`Received text from Godot: ${messageText}`);
});

sendButton.addEventListener("click", () => {
  postToGodot({
    type: "web_ping",
    payload: { source: "web" },
  });
});

postToGodot({
  type: "web_ready",
  payload: { source: "web" },
});
