import { useState, useCallback, useEffect } from "react";
import type { Message } from "../types/chat";

const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const STORAGE_KEY = "chat_messages";

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Restaurar Date objects que JSON convierte a string
    return parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [];
  }
}

  export function useChat() {
    const [messages, setMessages] = useState<Message[]>(loadMessages);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);


  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // hooks/useChat.ts — reemplaza el bloque del setTimeout
  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: content.trim(),
      history: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

    const data = await response.json();

    const assistantMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: data.reply,        // ajusta según lo que devuelva tu endpoint
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  
}, [isLoading]);
return { messages, isLoading, sendMessage };}
