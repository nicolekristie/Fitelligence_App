import React from "react";
import coachImage from "../assets/images/coachFace.jpeg";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import ChatMessage from "./ChatMessage";

const Chat = ({ userId, goal }) => {
  //form in which it will create the chat box
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const messagesEndRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Get user data from localStorage if not passed as props
  React.useEffect(() => {
    if (!userId) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } else {
      setUser({ id: userId });
    }
  }, [userId]);

  // Auto-scroll to bottom when new messages are added
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]); //user message
    setisLoading(true);
    inputRef.current.focus();

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user?.id,
          goal: goal,
        }),
      });
      const data = await response.json();

      // Add the bot's response to messages
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]); //AI response
      setisLoading(false);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble responding right now. Please try again.",
          isUser: false,
        },
      ]);
      setisLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* Chatbot Header */}
      <div className="card chat">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <img
              src={coachImage}
              alt="Chatbot Avatar"
              className="rounded-circle me-3"
              style={{ width: "45px", height: "45px" }}
            />
            <h5 className="mb-0">AI Fitness Coach</h5>
          </div>
        </div>

        <hr className="my-2" />

        <div className="card-body p-3">
          <p className="card-text mb-3">Hello, How can I assist you today?</p>

          {/* Messages display area */}
          <div
            className="mb-3"
            style={{
              minHeight: "60px",
              maxHeight: "400px",
              overflowY: "auto",
              padding: "10px",
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
            }}
          >
            {messages.length > 0 ? (
              <>
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={index}
                    message={msg}
                    isUser={msg.isUser}
                    isTyping={isLoading && index === messages.length - 1}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <div className="text-muted text-center py-3">No messages yet</div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="d-flex align-items-center">
            <div className="flex-grow-1 me-2">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary d-flex align-items-center justify-content-center"
              disabled={isLoading || !input.trim()}
              style={{ minWidth: "50px", height: "38px" }}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <PaperAirplaneIcon style={{ width: "20px", height: "20px" }} />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* External messages area is no longer needed */}
    </div>
  );
};

export default Chat;
