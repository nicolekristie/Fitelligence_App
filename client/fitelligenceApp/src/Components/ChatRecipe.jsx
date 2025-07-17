import React from "react";
import Markdown from "react-markdown";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatBot from "../hooks/useChatBot";

function ChatRecipe() {
  const [input, setInput] = React.useState("");
  const { messages, sendMessage, loading } = useChatBot();

  const handleSend = () => {
    if (input.trim() === "") return; // Prevent sending empty messages
    console.log("Message sent:", input);
    sendMessage(input); // Send message to chat bot
    setInput(""); // Clear input after sending
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-start min-vh-100 bg-light py-4">
      <h2
        className="text-center bg-white rounded shadow-sm py-3 px-4 mb-3 w-100"
        style={{ maxWidth: 500 }}
      >
        Chat with AI Coach
        <LuBot size={24} className="ms-2 align-middle" />
      </h2>
      <div
        className="w-100 d-flex flex-column align-items-center"
        style={{ maxWidth: 500 }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded max-w-xs ${
              msg.sender === "user" ? "bg-primary text-white" : "bg-light"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
        {loading && (
          <div className="d-flex align-items-center justify-content-center w-100 my-2">
            <span role="img" aria-label="thinking" style={{ fontSize: 32 }}>
              🤔
            </span>
            <span className="ms-2">Thinking...</span>
          </div>
        )}
        <textarea
          className="form-control mb-3"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          style={{ resize: "none" }}
        />
        <button
          onClick={handleSend}
          className="btn btn-primary w-100 mb-3"
          disabled={loading}
        >
          <LuSendHorizontal size={20} className="me-2" />
          Send
        </button>
      </div>
      <div
        className="flex-grow-1 w-100 overflow-y-auto p-4"
        style={{ maxWidth: 500 }}
      >
        {/* Chat messages will be displayed here */}
      </div>
    </div>
  );
}

export default ChatRecipe;
