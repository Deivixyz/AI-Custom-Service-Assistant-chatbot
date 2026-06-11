import React, { useEffect, useRef } from "react";
import type { Message } from "./types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import "./styles/MessageList.css";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="message-list message-list--empty">
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">◈</div>
          <p className="empty-state__text">Empieza una conversación</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list" role="log" aria-live="polite" aria-label="Mensajes del chat">
      <div className="message-list__inner">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} className="message-list__anchor" />
      </div>
    </div>
  );
};
