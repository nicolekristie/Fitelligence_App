import React from "react";
import coachImage from "../assets/images/coachFace.jpeg";
// import fitnessImage from "../assets/images/carousel/fitness.jpeg";
// import weightsImage from "../assets/images/carousel/weights.jpg";
// import stayStrongImage from "../assets/images/carousel/stayStrong.jpeg";
// import togetherImage from "../assets/images/carousel/together.jpg";
// AI Coach images
import balanceImage from "../assets/images/aiCoach/balance.jpg";
import focusedImage from "../assets/images/aiCoach/focused.jpg";
import intenseImage from "../assets/images/aiCoach/intense.jpg";
import kettlebellImage from "../assets/images/aiCoach/kettlebell.jpg";
import powerImage from "../assets/images/aiCoach/power.jpg";
import fitnessPartner from "../assets/images/aiCoach/fitness-partners.jpg";
import workoutGirlImage from "../assets/images/aiCoach/workoutgirl.jpg";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import ChatMessage from "./ChatMessage";
import RandomQuotes from "./RandomQuotes";
import { motion } from "framer-motion";

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
                  <img
                    src={coachImage}
                    alt="Fitness Coach"
                    className="img-fluid rounded shadow-sm"
                    style={{
                      width: "80%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
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
              <div className="card chat h-100">
                <div className="card-header py-2">
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
                      border: "1px solid #dee2e6",
                      borderRadius: "6px",
                      backgroundColor: "#f8f9fa",
                      minHeight: "250px",
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
                              isLoading && index === messages.length - 1
                            }
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <div className="text-muted text-center py-2 small">
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
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                      disabled={isLoading || !input.trim()}
                      style={{ minWidth: "45px", height: "32px" }}
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
              <h5 className="text-center mb-4 text-primary">
                AI Coach Fitness Gallery
              </h5>
              <div className="row g-3">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <motion.div
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 2, zIndex: 10 }}
                    style={{
                      position: "relative",
                      transformOrigin: "center left",
                    }}
                  >
                    <motion.img
                      src={balanceImage}
                      alt="Balance Training"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
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
                    style={{ position: "relative" }}
                  >
                    <img
                      src={focusedImage}
                      alt="Focused Training"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
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
                    style={{ position: "relative" }}
                  >
                    <img
                      src={intenseImage}
                      alt="Intense Workout"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
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
                    style={{ position: "relative" }}
                  >
                    <img
                      src={kettlebellImage}
                      alt="Kettlebell Training"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
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
                    style={{ position: "relative" }}
                  >
                    <img
                      src={powerImage}
                      alt="Power Training"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
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
                      transformOrigin: "center right",
                    }}
                  >
                    <img
                      src={fitnessPartner}
                      alt="Male Fitness"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
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
