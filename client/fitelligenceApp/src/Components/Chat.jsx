import React from "react";
import { flushSync } from "react-dom";
import coachImage from "../assets/images/coachFace.png";
import balanceImage from "../assets/images/aiCoach/balance.jpg";
import focusedImage from "../assets/images/aiCoach/focused.jpg";
import intenseImage from "../assets/images/aiCoach/intense.jpg";
import kettlebellImage from "../assets/images/aiCoach/kettlebell.jpg";
import powerImage from "../assets/images/aiCoach/power.jpg";
import fitnessPartner from "../assets/images/aiCoach/fitness-partners.jpg";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import ChatMessage from "./ChatMessage";
import RandomQuotes from "./RandomQuotes";
import { motion } from "framer-motion";
import { useUser } from "./Context/userContext.jsx";

const Chat = ({ userId, goal }) => {
  //form in which it will create the chat box
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setisLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Get user from context
  const { user } = useUser();

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

    const requestData = {
      message: userMessage,
      userId: user?.id,
      goal: goal,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // STREAMING response handling
      if (response.body) {
        const reader = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();
        let fullResponse = "";
        // Add a placeholder message for streaming
        setMessages((prev) => [...prev, { text: "", isUser: false }]);
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          fullResponse += value;
          // Force React to update UI immediately on each chunk
          flushSync(() => {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                text: fullResponse,
                isUser: false,
              };
              return updated;
            });
          });
        }
        setisLoading(false);
      } else {
        // Fallback for non-streaming response
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { text: data.response, isUser: false },
        ]);
        setisLoading(false);
      }
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

  const [rotate, setRotate] = React.useState(false);
  const [rotatePersonalized, setRotatePersonalized] = React.useState(false);

  return (
    <div className="container-fluid mt-4 px-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="row">
            {/* Left Column - Images */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="row g-3">
                <div className="col-12">
                  <div
                    className="rounded shadow-sm d-flex align-items-center justify-content-center"
                    style={{
                      width: "80%",
                      height: "180px",
                      background:
                        "linear-gradient(135deg, #232323 0%, #b31217 100%)", // palette background
                      borderRadius: 18,
                      boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
                      padding: "8px",
                    }}
                  >
                    <img
                      src={coachImage}
                      alt="Fitness Coach"
                      className="img-fluid rounded shadow-sm"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 14,
                        boxShadow: "none",
                      }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="bg-primary text-white p-2 rounded text-center"
                    style={{
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: rotatePersonalized ? [0, 360, 720, 1080] : 0,
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      onClick={() => setRotatePersonalized(!rotatePersonalized)}
                      onAnimationComplete={() => setRotatePersonalized(false)}
                    >
                      <h6 className="mb-1 small">Personalized</h6>
                      <small>AI Coaching</small>
                    </motion.div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="bg-success text-white p-2 rounded text-center"
                    style={{
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: rotate ? [0, 360, 720, 1080] : 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      onClick={() => setRotate(!rotate)}
                      onAnimationComplete={() => setRotate(false)}
                    >
                      <h6 className="mb-1 small">Available</h6>
                      <small>24/7</small>
                    </motion.div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <RandomQuotes />
                </div>
              </div>
            </div>

            {/* Right Column - Expanded Chat */}
            <div className="col-lg-9 col-md-8">
              <div
                className="card chat h-100"
                style={{
                  background:
                    "linear-gradient(135deg, #232323 0%, #b31217 100%)", // Fitelligence palette
                  border: "2px solid #b31217",
                  borderRadius: 18,
                  boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
                  color: "#fff",
                }}
              >
                <div
                  className="card-header py-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #b31217 0%, #232323 100%)",
                    color: "#fff",
                    borderRadius: "16px 16px 0 0",
                    borderBottom: "2px solid #b31217",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={coachImage}
                      alt="Chatbot Avatar"
                      className="rounded-circle me-2"
                      style={{ width: "35px", height: "35px" }}
                    />
                    <h6 className="mb-0">AI Fitness Coach</h6>
                  </div>
                </div>

                <div
                  className="card-body p-2"
                  style={{
                    height: "450px",
                    display: "flex",
                    flexDirection: "column",
                    background: "transparent",
                  }}
                >
                  <p className="card-text mb-2 small text-muted">
                    Hello, How can I assist you today?
                  </p>

                  {/* Messages display area - compact */}
                  <div
                    className="flex-grow-1 mb-2"
                    style={{
                      overflowY: "auto",
                      padding: "8px",
                      border: "2px solid #b31217",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, #232323 0%, #b31217 100%)",
                      minHeight: "250px",
                      color: "#fff",
                    }}
                  >
                    {messages.length > 0 ? (
                      <>
                        {messages.map((msg, index) => (
                          <ChatMessage
                            key={index}
                            message={msg}
                            isUser={msg.isUser}
                            isTyping={
                              // Show 'Thinking' only if last AI message is empty
                              index === messages.length - 1 &&
                              !msg.isUser &&
                              msg.text === ""
                            }
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <div
                        className="text-muted text-center py-2 small"
                        style={{ color: "#fff", opacity: 0.6 }}
                      >
                        No messages yet
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="d-flex align-items-center"
                  >
                    <div className="flex-grow-1 me-2">
                      <input
                        ref={inputRef}
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        style={{
                          background: "#232323",
                          color: "#fff",
                          border: "2px solid #b31217",
                          borderRadius: 10,
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                      disabled={isLoading || !input.trim()}
                      style={{
                        minWidth: "45px",
                        height: "32px",
                        background:
                          "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
                        border: "none",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: 10,
                        boxShadow: "0 0 12px #b31217",
                      }}
                    >
                      {isLoading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <PaperAirplaneIcon
                          style={{ width: "16px", height: "16px" }}
                        />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery Section Below Chat */}
          <div className="row mt-4 mb-5">
            <div className="col-12">
              <h5 className="text-center mb-4 text-white">
                AI Coach Fitness Gallery
              </h5>
              <div className="row g-3">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    // style={{
                    //   position: "relative",
                    //   transformOrigin: "center left",
                    // }}
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #b31217 0%, #232323 100%)", // updated palette
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                      border: "2px solid #b31217",
                      color: "#fff",
                    }}
                  >
                    <a href="/sample-workouts">
                      <motion.img
                        src={balanceImage}
                        alt="Balance Training"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                    <div className="card-body p-2">
                      <h6 className="card-title small mb-1">⚖️ Balance</h6>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Core stability and balance training
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #b31217 0%, #232323 100%)", // updated palette
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                      border: "2px solid #b31217",
                      color: "#fff",
                    }}
                  >
                    <a href="/sample-workouts">
                      <img
                        src={focusedImage}
                        alt="Focused Training"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                    <div className="card-body p-2">
                      <h6 className="card-title small mb-1">🎯 Focus</h6>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Mental focus and concentration
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #b31217 0%, #232323 100%)", // updated palette
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                      border: "2px solid #b31217",
                      color: "#fff",
                    }}
                  >
                    <a href="/sample-workouts">
                      <img
                        src={intenseImage}
                        alt="Intense Workout"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                    <div className="card-body p-2">
                      <h6 className="card-title small mb-1">🔥 Intensity</h6>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        High-intensity interval training
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #b31217 0%, #232323 100%)", // updated palette
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                      border: "2px solid #b31217",
                      color: "#fff",
                    }}
                  >
                    <a href="/sample-workouts">
                      <img
                        src={kettlebellImage}
                        alt="Kettlebell Training"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                    <div className="card-body p-2">
                      <h6 className="card-title small mb-1">🏋️ Kettlebell</h6>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Functional strength training
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #b31217 0%, #232323 100%)", // updated palette
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                      border: "2px solid #b31217",
                      color: "#fff",
                    }}
                  >
                    <a href="/sample-workouts">
                      <img
                        src={powerImage}
                        alt="Power Training"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                    <div className="card-body p-2">
                      <h6 className="card-title small mb-1">⚡ Power</h6>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Explosive power development
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #b31217 0%, #232323 100%)", // updated palette
                      borderRadius: 16,
                      boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                      border: "2px solid #b31217",
                      color: "#fff",
                    }}
                  >
                    <a href="/sample-workouts">
                      <img
                        src={fitnessPartner}
                        alt="Male Fitness"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                    <div className="card-body p-2">
                      <h6 className="card-title small mb-1">
                        💪 Fitness Partners
                      </h6>
                      <p
                        className="card-text text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Get fit together!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
