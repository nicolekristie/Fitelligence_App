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
        className={`p-3 rounded ${
          isUser ? "bg-primary text-white" : "bg-light"
        }`}
        style={{ maxWidth: "70%" }}
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
