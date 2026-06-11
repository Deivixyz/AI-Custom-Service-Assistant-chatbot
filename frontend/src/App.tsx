import React from "react";
import { ChatWindow } from "./components/chat/ChatWindow";
import "./App.css";

const App: React.FC = () => {
  return (
    <main className="app">
      <ChatWindow />
    </main>
  );
};

export default App;
