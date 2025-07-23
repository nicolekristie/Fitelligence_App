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
import { useUser } from "./Context/userContext.jsx";

function ChatRecipe() {
  const { user } = useUser(); // Use user context directly
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Streaming sendMessage for chat-recipe
  const sendMessage = async (userMessage) => {
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setLoading(true);
    try {
      console.log("Sending recipe request for userId:", user && user.id);
      const response = await fetch("/api/chat-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, userId: user && user.id }),
      });
      if (response.body) {
        const reader = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();
        let fullResponse = "";
        setMessages((prev) => [...prev, { text: "", sender: "bot" }]);
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          fullResponse += value;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { text: fullResponse, sender: "bot" };
            return updated;
          });
        }
        setLoading(false);
      } else {
        // Fallback for non-streaming
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot" },
        ]);
        setLoading(false);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble responding right now. Please try again.",
          sender: "bot",
        },
      ]);
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts link for Pacifico */}
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />

      {/* Desktop: separate top left and top right elements */}
      <div className="top-label-desktop">
        <img src={shrimp} alt="Food Icon" className="top-label-img" />
        <span className="top-label-text">
          Healthy eating isn’t a diet,
          <br />
          it’s a lifestyle.
          <br />
          Nourish your body, fuel your life.
        </span>
      </div>
      <div
        className="motivational-equation-desktop"
        title="Strength + Healthy Food = Fit!"
      >
        <span className="motivational-icon" role="img" aria-label="muscle">
          💪
        </span>
        <span className="motivational-plus" role="img" aria-label="plus">
          ➕
        </span>
        <span className="motivational-icon" role="img" aria-label="salad">
          🥗
        </span>
        <span className="motivational-plus" role="img" aria-label="equals">
          ＝
        </span>
        <span className="motivational-icon" role="img" aria-label="fit">
          🏅
        </span>
      </div>

      {/* Mobile: grouped banner, only visible on mobile */}
      <div className="top-banner-responsive">
        <div className="top-label-responsive">
          <img src={shrimp} alt="Food Icon" className="top-label-img" />
          <span className="top-label-text">
            Healthy eating isn’t a diet,
            <br />
            it’s a lifestyle.
            <br />
            Nourish your body, fuel your life.
          </span>
        </div>
        <div
          className="motivational-equation"
          title="Strength + Healthy Food = Fit!"
        >
          <span className="motivational-icon" role="img" aria-label="muscle">
            💪
          </span>
          <span className="motivational-plus" role="img" aria-label="plus">
            ➕
          </span>
          <span className="motivational-icon" role="img" aria-label="salad">
            🥗
          </span>
          <span className="motivational-plus" role="img" aria-label="equals">
            ＝
          </span>
          <span className="motivational-icon" role="img" aria-label="fit">
            🏅
          </span>
        </div>
      </div>

      {/* Responsive styles for top right and top left text */}
      <style>{`
        /* Hide mobile banner on desktop, show on mobile */
        .top-banner-responsive {
          display: none;
        }
        @media (max-width: 900px) {
          .top-banner-responsive {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            width: 100vw;
            max-width: 100vw;
            position: relative;
            z-index: 30;
          }
        }

        /* Desktop: show corners, hide on mobile */
        .top-label-desktop, .motivational-equation-desktop {
          position: fixed;
          z-index: 30;
        }
        .top-label-desktop {
          top: 70px;
          left: 16px;
          font-family: 'Pacifico', 'Brush Script MT', cursive, sans-serif;
          font-size: 26px;
          color: #111;
          text-shadow: 0 2px 8px rgba(0,0,0,0.04);
          letter-spacing: 1px;
          user-select: none;
          font-style: italic;
          transform: skew(-12deg);
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255,255,255,0.95);
          border-radius: 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          padding: 6px 18px;
          border: 2px solid #e3f6f5;
          max-width: 60vw;
          flex-wrap: wrap;
        }
        .motivational-equation-desktop {
          top: 70px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.95);
          border-radius: 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          padding: 6px 18px;
          border: 2px solid #e3f6f5;
          user-select: none;
          font-size: 26px;
          max-width: 36vw;
          flex-wrap: wrap;
        }
        .top-label-img {
          width: 38px;
          height: 38px;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 10px;
          margin-top: 2px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          border: 2px solid #fff;
          background: #f8f8f8;
        }
        .top-label-text {
          display: block;
          word-break: break-word;
        }
        .motivational-icon {
          font-size: 32px;
        }
        .motivational-plus {
          font-size: 26px;
          margin: 0 2px;
        }
        @media (max-width: 900px) {
          .top-label-desktop, .motivational-equation-desktop {
            display: none !important;
          }
          .top-label-responsive, .motivational-equation {
            font-size: 16px;
            padding: 4px 10px;
            border-radius: 20px;
            margin: 8px auto 0 auto;
            max-width: 90vw;
          }
          .top-label-responsive {
            font-family: 'Pacifico', 'Brush Script MT', cursive, sans-serif;
          }
          .top-label-img {
            width: 18px;
            height: 18px;
            margin-right: 2px;
            margin-top: 1px;
          }
          .motivational-icon {
            font-size: 18px;
          }
          .motivational-plus {
            font-size: 14px;
          }
        }
        @media (max-width: 700px) {
          .top-banner-responsive {
            gap: 4px;
          }
          .top-label-responsive, .motivational-equation {
            font-size: 12px;
            padding: 2px 4px;
            border-radius: 14px;
            margin: 4px auto 0 auto;
            max-width: 98vw;
          }
          .top-label-img {
            width: 12px;
            height: 12px;
            margin-right: 1px;
            margin-top: 0px;
          }
          .motivational-icon {
            font-size: 14px;
          }
          .motivational-plus {
            font-size: 10px;
          }
        }
      `}</style>
      {/* ...existing code... */}
      <div
        className="d-flex flex-column align-items-center justify-content-start bg-light py-4"
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
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
          letterSpacing: 1,
          borderTop: "2px solid #b2f7ef",
          boxShadow: "0 -2px 16px rgba(27, 107, 107, 0.07)",
          borderRadius: "0 0 18px 18px",
          marginTop: "auto",
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
