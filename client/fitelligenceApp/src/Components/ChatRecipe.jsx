import React from "react";
import logo from "../assets/images/logo.png";
import fish from "../assets/images/recipes/fish.jpg";
import grilledFish from "../assets/images/recipes/grilledFish.jpg";
import shrimp from "../assets/images/recipes/shrimp.jpg";
import wholeFish from "../assets/images/recipes/wholeFish.jpg";
import wine from "../assets/images/recipes/wine.jpg";
import roastedChicken from "../assets/images/recipes/roastedChicken.jpg";
import Markdown from "react-markdown";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatBot from "../hooks/useChatBot";

function ChatRecipe() {
  const { user } = useChatBot(); // Try to get user context if available
  const [input, setInput] = React.useState("");
  const { messages, sendMessage, loading } = useChatBot();

  const handleSend = () => {
    if (input.trim() === "") return; // Prevent sending empty messages
    console.log("Message sent:", input);
    sendMessage(input); // Send message to chat bot
    setInput(""); // Clear input after sending
  };

  return (
    <div>
      {/* Google Fonts link for Pacifico */}
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
      {/* Top right motivational icon equation */}
      <div
        style={{
          position: "fixed",
          top: 88, // push below navbar
          right: 24,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 32,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "6px 18px 6px 18px",
          border: "2px solid #e3f6f5",
          userSelect: "none",
        }}
        title="Strength + Healthy Food = Fit!"
      >
        <span style={{ fontSize: 32 }} role="img" aria-label="muscle">
          💪
        </span>
        <span
          style={{ fontSize: 26, margin: "0 2px" }}
          role="img"
          aria-label="plus"
        >
          ➕
        </span>
        <span style={{ fontSize: 32 }} role="img" aria-label="salad">
          🥗
        </span>
        <span
          style={{ fontSize: 26, margin: "0 2px" }}
          role="img"
          aria-label="equals"
        >
          ＝
        </span>
        <span style={{ fontSize: 32 }} role="img" aria-label="fit">
          🏅
        </span>
      </div>
      {/* Top right corner label */}
      <div
        style={{
          position: "fixed",
          top: 80, // push below nav bar
          left: 36,
          zIndex: 10,
          fontFamily: "'Pacifico', 'Brush Script MT', cursive, sans-serif",
          fontSize: 26, // even smaller
          color: "#111",
          textShadow: "0 2px 8px rgba(0,0,0,0.04)",
          letterSpacing: 1,
          userSelect: "none",
          fontStyle: "italic",
          transform: "skew(-12deg)", // more slanted
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <img
          src={shrimp}
          alt="Food Icon"
          style={{
            width: 38,
            height: 38,
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: 10,
            marginTop: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            border: "2px solid #fff",
            background: "#f8f8f8",
          }}
        />
        <span>
          Healthy eating isn’t a diet,
          <br />
          it’s a lifestyle.
          <br />
          Nourish your body, fuel your life.
        </span>
      </div>
      {/* ...existing code... */}
      <div
        className="d-flex flex-column align-items-center justify-content-start min-vh-100 bg-light py-4"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Lightened logo background overlay */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            opacity: 0.08,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Side images */}
        {/* Responsive side images */}
        <img
          src={wine}
          alt="Wine"
          className="side-img-wine d-none d-md-block"
          style={{
            position: "fixed",
            left: 32,
            top: "50%",
            transform: "translateY(-50%)",
            width: 200,
            height: 340,
            objectFit: "cover",
            borderRadius: 32,
            filter: "brightness(0.92) saturate(1.05)",
            boxShadow: "none",
            zIndex: 2,
            maxWidth: "34vw",
            maxHeight: "48vh",
          }}
        />
        <img
          src={roastedChicken}
          alt="Roasted Chicken  "
          className="side-img-fire d-none d-md-block"
          style={{
            position: "fixed",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
            width: 200,
            height: 340,
            objectFit: "cover",
            borderRadius: 32,
            filter: "brightness(0.92) saturate(1.05)",
            boxShadow: "none",
            zIndex: 2,
            maxWidth: "34vw",
            maxHeight: "48vh",
          }}
        />
        <style>{`
        @media (max-width: 991px) {
          .side-img-wine, .side-img-fire {
            display: none !important;
          }
        }
        @media (max-width: 900px) {
          .food-row-img {
            width: 90px !important;
            height: 90px !important;
          }
        }
        @media (max-width: 700px) {
          .chat-main {
            max-width: 98vw !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
        {/* Food images row */}
        <div
          className="d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap"
          style={{ zIndex: 1, position: "relative" }}
        >
          <img
            src={fish}
            alt="Fish"
            className="food-row-img"
            style={{
              width: 130,
              height: 130,
              objectFit: "cover",
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
          />
          <img
            src={grilledFish}
            alt="Grilled Fish"
            className="food-row-img"
            style={{
              width: 130,
              height: 130,
              objectFit: "cover",
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
          />
          <img
            src={shrimp}
            alt="Shrimp"
            className="food-row-img"
            style={{
              width: 130,
              height: 130,
              objectFit: "cover",
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
          />
          <img
            src={wholeFish}
            alt="Whole Fish"
            className="food-row-img"
            style={{
              width: 130,
              height: 130,
              objectFit: "cover",
              borderRadius: 20,
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            }}
          />
        </div>
        <h2
          className="text-center bg-white rounded shadow-sm py-4 px-5 mb-4 w-100 chat-main"
          style={{ maxWidth: 700, fontSize: "2.2rem" }}
        >
          Chat with AI Coach
          <LuBot size={24} className="ms-2 align-middle" />
        </h2>
        <div
          className="w-100 d-flex flex-column align-items-center chat-main"
          style={{ maxWidth: 700 }}
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
      </div>
      {/* Fun personalized encouragement footer at the very bottom of the page, fixed */}
      <footer
        style={{
          width: "100%",
          background: "#e3f6f5",
          color: "#1b6b6b",
          fontFamily: "'Pacifico', 'Brush Script MT', cursive, sans-serif",
          fontSize: 22,
          textAlign: "center",
          padding: "28px 0 18px 0",
          marginTop: 0,
          letterSpacing: 1,
          borderTop: "2px solid #b2f7ef",
          boxShadow: "0 -2px 16px rgba(27, 107, 107, 0.07)",
          borderRadius: "0 0 18px 18px",
          zIndex: 100,
          position: "fixed",
          left: 0,
          bottom: 0,
        }}
      >
        {`Keep fueling your journey, ${
          user && user.firstname ? user.firstname : "Fitelligence friend"
        }! Every meal counts.`}
      </footer>
    </div>
  );
}

export default ChatRecipe;
