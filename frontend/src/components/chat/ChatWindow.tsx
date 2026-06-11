import React from "react";
import { useChat } from "../../hooks/useChat";
import { MessageList } from "../../MessageList";
import { ChatInput } from "../../ChatInput";
import "../../styles/ChatWindow.css";

export const ChatWindow: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="chat-window">
      {/* Header */}
      <header className="chat-header">
        <div className="chat-header__identity">
          <div className="chat-header__status-dot" aria-hidden="true" />
          <span className="chat-header__title">AI Assistant</span>
        </div>
      </header>

      {/* Mensajes */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Divider */}
      <div className="chat-divider" aria-hidden="true" />

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};
