import React from "react";
import "./styles/TypingIndicator.css";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="typing-wrapper" aria-label="El asistente está escribiendo">
      <div className="typing-avatar" aria-hidden="true">
        <span>AI</span>
      </div>
      <div className="typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
};
