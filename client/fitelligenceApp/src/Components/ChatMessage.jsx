import React from "react";
import { UserIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import Markdown from "react-markdown";

const ChatMessage = ({ message, isUser, isTyping = false }) => {
  return (
    <div
      className={`d-flex mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      {!isUser && (
        <div className="me-2">
          <ComputerDesktopIcon
            className="text-primary"
            style={{ width: "32px", height: "32px" }}
          />
        </div>
      )}

      <div
       style={{
          background: isUser
            ? "linear-gradient(90deg, #232323 0%, #000 100%)"
            : "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
          color: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 18px rgba(179,18,23,0.18)",
          padding: "14px 16px",
          marginBottom: 6,
          maxWidth: "70%",
          alignSelf: isUser ? "flex-end" : "flex-start",
          fontSize: "1.08rem",
          fontWeight: 500,
          wordBreak: "break-word",
          border: isUser
            ? "2px solid #b31217"
            : "2.5px solid #fff",
          textShadow: isUser
            ? "none"
            : "0 2px 8px #b31217, 0 4px 24px #000",
          letterSpacing: "0.5px",
        }}
      >
        {isTyping ? (
          <div className="d-flex align-items-center">
            <span className="me-2">Thinking</span>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : isUser ? (
          <span>{message.text}</span>
        ) : (
          <div className="chat-message-content">
            <Markdown>{message.text}</Markdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="ms-2">
          <UserIcon
            className="text-secondary"
            style={{ width: "32px", height: "32px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
