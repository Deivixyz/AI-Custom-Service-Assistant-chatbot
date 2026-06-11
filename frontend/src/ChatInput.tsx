import React, { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import "./styles/ChatInput.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !isLoading;

  const handleSend = () => {
    if (!canSend) return;
    onSend(value);
    setValue("");
    // Resetear altura del textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Cmd/Ctrl + Enter o solo Enter para enviar; Shift+Enter = nueva línea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div className="chat-input-wrapper">
      <div className={`chat-input ${isLoading ? "chat-input--loading" : ""}`}>
        <textarea
          ref={textareaRef}
          className="chat-input__textarea"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje…"
          disabled={isLoading}
          rows={1}
          aria-label="Escribe tu mensaje"
        />
        <button
          className={`chat-input__send ${canSend ? "chat-input__send--active" : ""}`}
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Enviar mensaje"
          type="button"
        >
          <SendIcon />
        </button>
      </div>
      <p className="chat-input__hint">Enter para enviar · Shift+Enter para nueva línea</p>
    </div>
  );
};

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
