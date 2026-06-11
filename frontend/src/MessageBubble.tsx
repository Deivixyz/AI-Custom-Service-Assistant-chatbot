import React from "react";
import type { Message } from "./types/chat";
import "./styles/MessageBubble.css";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`bubble-wrapper ${isUser ? "bubble-wrapper--user" : "bubble-wrapper--assistant"}`}>
      {!isUser && (
        <div className="bubble-avatar" aria-hidden="true">
          <span>AI</span>
        </div>
      )}

      <div className={`bubble ${isUser ? "bubble--user" : "bubble--assistant"}`}>
        <p className="bubble__content">{message.content}</p>
        <time className="bubble__time" dateTime={message.timestamp.toISOString()}>
          {formatTime(message.timestamp)}
        </time>
      </div>
    </div>
  );
};
