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
  // Add missing handleSend function
  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };
  // ...existing code...
  const { user } = useUser(); // Use user context directly
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Streaming sendMessage for chat-recipe
  const messagesEndRef = React.useRef(null);

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

  // Auto-scroll to bottom when messages update
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Restore original visual layout with images and heading
  return (
    <>
      {/* Side images (fixed) */}
      <img
        src={wine}
        alt="Wine"
        className="side-img-wine d-none d-md-block"
        style={{
          position: "fixed",
          left: 32,
          top: "52%",
          transform: "translateY(-40%)",
          width: 300,
          height: 340,
          objectFit: "cover",
          borderRadius: 32,
          filter: "brightness(0.92) saturate(1.05)",
          boxShadow: "none",
          zIndex: 2,
          maxWidth: "48vw",
          maxHeight: "52vh",
        }}
      />
      <img
        src={roastedChicken}
        alt="Roasted Chicken"
        className="side-img-fire d-none d-md-block"
        style={{
          position: "fixed",
          right: 32,
          top: "52%",
          transform: "translateY(-40%)",
          width: 300,
          height: 340,
          objectFit: "cover",
          borderRadius: 32,
          filter: "brightness(0.92) saturate(1.05)",
          boxShadow: "none",
          zIndex: 2,
          maxWidth: "48vw",
          maxHeight: "52vh",
        }}
      />
      {/* Main scrollable content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #000 0%, #b31217 100%)",
          backgroundImage: "none",
          overflowX: "hidden",
        }}
      >
        {/* Top section: motivational text (left) and emoji sequence (right) - grid for alignment */}
        {/* Motivational text and emoji sequence in flex row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100vw",
            zIndex: 100,
            gap: 24,
            marginTop: 12,
          }}
        >
          {/* Motivational text flush left */}
          <div
            style={{
              fontFamily: "'Pacifico', 'Brush Script MT', cursive, sans-serif",
              color: "#232323",
              fontSize: 28,
              fontWeight: 900,
              textShadow: "0 2px 8px #fff",
              letterSpacing: 1,
              background: "rgba(255,255,255,0.92)",
              borderRadius: 18,
              padding: "18px 12px 18px 12px",
              border: "1.5px solid #e3f6f5",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              textAlign: "left",
              minWidth: 340,
              alignSelf: "flex-start",
              marginLeft: "32px",
              marginTop: "12px",
              marginRight: "auto",
            }}
          >
            Healthy eating isn't a diet, it's a lifestyle.
            <br />
            <span
              style={{
                color: "#232323",
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              Nourish your body, fuel your life.
            </span>
          </div>
          {/* Emoji sequence in rounded box - stays top right */}
          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              borderRadius: 22,
              padding: "10px 32px",
              display: "flex",
              alignItems: "center",
              fontSize: 38,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              border: "1.5px solid #e3f6f5",
              zIndex: 101,
              marginRight: "32px",
              marginTop: "12px",
            }}
          >
            <span role="img" aria-label="muscle">
              💪
            </span>
            <span style={{ fontSize: 32, margin: "0 12px" }}>+</span>
            <span role="img" aria-label="salad">
              🥗
            </span>
            <span style={{ fontSize: 32, margin: "0 12px" }}>=</span>
            <span role="img" aria-label="medal">
              🏅
            </span>
          </div>
        </div>
        {/* ...existing code... */}
        {/* Food images row */}
        <div
          className="d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap"
          style={{
            zIndex: 1,
            position: "relative",
            marginTop: "-72px", // Move up closer to the top edge
          }}
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
        {/* Chat dialog with heading above input */}
        <div
          className="chat-recipe-messages"
          style={{
            maxWidth: 700,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 50,
            position: "relative",
            flex: 1,
            minHeight: 420,
          }}
        >
          {/* Chat heading above input */}
          <div
            style={{
              textAlign: "center",
              margin: "0 0 12px 0",
              color: "#232323",
              fontWeight: 900,
              fontSize: "1.6rem",
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              padding: "10px 0 4px 0",
              width: "100%",
              border: "2px solid #e3f6f5",
              letterSpacing: 1,
              position: "relative",
            }}
          >
            Chat About Recipes <LuBot size={28} className="ms-2 align-middle" />
          </div>
          {/* Chat messages area above input section, scrollable with max height and full width */}
          <div
            style={{
              width: "100%",
              maxHeight: "480px", // Increased height for bigger dialog
              minHeight: "180px", // Ensure visible area even if empty
              overflowY: "auto",
              paddingBottom: 8,
              paddingRight: 12, // Add space for scrollbar
              marginBottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              flex: "none",
              scrollbarColor: "#888 #d3d3d3",
              scrollbarWidth: "thin",
              borderRadius: 14, // Match dialog corners
              background: "#fff",
            }}
            id="chat-messages-scroll"
          >
            <style>{`
            .chat-recipe-messages > div::-webkit-scrollbar {
              width: 8px;
              background: #d3d3d3; /* light grey track */
            }
            .chat-recipe-messages > div::-webkit-scrollbar-thumb {
              background: #888; /* medium grey thumb */
              border-radius: 8px;
            }
          `}</style>
            {messages.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#888",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  padding: "48px 0",
                  opacity: 0.8,
                }}
              >
                No messages yet
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      background: msg.sender === "user" ? "#e3f6f5" : "#fff",
                      color: msg.sender === "user" ? "#1b6b6b" : "#232323",
                      borderRadius: 14,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                      padding: "16px 18px",
                      marginBottom: 4,
                      width: "100%",
                      alignSelf:
                        msg.sender === "user" ? "flex-end" : "flex-start",
                      fontSize: "1.08rem",
                      fontWeight: 500,
                      wordBreak: "break-word",
                      border:
                        msg.sender === "user"
                          ? "2px solid #b2f7ef"
                          : "2px solid #e3f6f5",
                    }}
                  >
                    <Markdown>{msg.text}</Markdown>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          {/* Input section at the bottom, same width */}
          <div
            style={{
              width: "100%",
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
              padding: "12px 0 8px 0",
              border: "2px solid #e3f6f5",
              marginTop: 18, // Add space above input section
              marginBottom: 12,
              zIndex: 150,
            }}
          >
            <textarea
              className="form-control mb-2 chat-recipe-textarea"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              style={{ resize: "none", minHeight: 60, maxHeight: 120 }}
            />
            <button
              onClick={handleSend}
              className="btn btn-primary w-100 chat-recipe-send-btn"
              disabled={loading}
              style={{ marginTop: 4 }}
            >
              <LuSendHorizontal size={20} className="me-2" />
              Send
            </button>
          </div>
        </div>
        {/* Footer (static, scrolls with page) */}
        <footer
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.92)",
            color: "#1b6b6b",
            fontFamily: "'Pacifico', 'Brush Script MT', cursive, sans-serif",
            fontSize: 32,
            fontWeight: 900,
            textAlign: "center",
            padding: "28px 0 18px 0",
            letterSpacing: 1,
            borderTop: "2px solid #b2f7ef",
            boxShadow: "0 -2px 16px rgba(27, 107, 107, 0.07)",
            borderRadius: "0 0 18px 18px",
            position: "static",
            left: 0,
            bottom: 0,
            zIndex: 200,
          }}
        >
          {`Keep fueling your journey, ${
            user && user.firstname ? user.firstname : "Fitelligence friend"
          }! Every meal counts.`}
        </footer>
      </div>
    </>
  );
}
export default ChatRecipe;
