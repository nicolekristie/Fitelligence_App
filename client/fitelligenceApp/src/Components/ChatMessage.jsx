import React from "react";
import { UserIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

const formatMessage = (text) => {
  if (!text) return "";

  // Split by line breaks and filter out empty lines
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    // Handle workout exercises (contains sets, reps, minutes, etc.)
    if (
      trimmedLine.match(
        /\d+\s*(sets?|reps?|minutes?|seconds?|lbs?|kg|times?)/i
      ) ||
      trimmedLine.match(
        /(push-ups?|squats?|plank|deadlift|bench press|pull-ups?)/i
      )
    ) {
      return (
        <div key={index} className="workout-item">
          {trimmedLine}
        </div>
      );
    }

    // Handle bullet points (•, -, *, numbers)
    if (trimmedLine.match(/^[\•\-\*]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
      return (
        <div key={index} className="mb-1" style={{ paddingLeft: "15px" }}>
          {trimmedLine}
        </div>
      );
    }

    // Handle numbered steps or instructions
    if (trimmedLine.match(/^Step\s+\d+:/i) || trimmedLine.match(/^\d+\)/)) {
      return (
        <div key={index} className="mb-2 fw-bold">
          {trimmedLine}
        </div>
      );
    }

    // Handle headers or emphasis (words in ALL CAPS or starting with uppercase and ending with colon)
    if (
      trimmedLine.match(/^[A-Z][A-Z\s]+:/) ||
      (trimmedLine.endsWith(":") &&
        trimmedLine.length < 50 &&
        trimmedLine.match(/^[A-Z]/))
    ) {
      return (
        <div key={index} className="mb-2 fw-semibold">
          {trimmedLine}
        </div>
      );
    }

    // Handle important notes or warnings
    if (trimmedLine.match(/^(note|important|warning|remember|tip):/i)) {
      return (
        <div key={index} className="mb-2 text-warning fw-semibold">
          {trimmedLine}
        </div>
      );
    }

    // Regular paragraphs
    return (
      <div key={index} className="mb-2">
        {trimmedLine}
      </div>
    );
  });
};

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
            {formatMessage(message.text)}
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
