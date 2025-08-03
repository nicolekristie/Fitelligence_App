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
  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };
  const { user } = useUser();
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const messagesEndRef = React.useRef(null);

  const sendMessage = async (userMessage) => {
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setLoading(true);
    try {
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

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: /Mobi|Android/i.test(navigator.userAgent) ? "auto" : "smooth",
        block: "end",
      });
    }
  }, [messages, loading]);

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
        {/* Top section: motivational text and emoji sequence */}
        <div
          className="motivation-row"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100vw",
            zIndex: 100,
            gap: 24,
            marginTop: 12,
            flexWrap: "wrap",
          }}
        >
          <style>{`
            @media (max-width: 700px) {
              .motivation-row {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 12px !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
              }
              .motivation-text,
              .motivation-emoji {
                min-width: 0 !important;
                width: 100% !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
                margin-top: 8px !important;
              }
            }
          `}</style>
          <div
            className="motivation-text"
            style={{
              fontFamily: "'Pacifico', 'Brush Script MT', cursive, sans-serif",
              color: "#fff",
              fontSize: 28,
              fontWeight: 900,
              textShadow: "0 2px 8px #fff",
              letterSpacing: 1,
              background: "linear-gradient(90deg, #b31217 0%, #232323 100%)",
              borderRadius: 18,
              padding: "18px 12px 18px 12px",
              border: "2px solid #b31217",
              boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
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
                color: "#fff",
                fontWeight: 700,
                fontFamily: "inherit",
                textShadow: "0 1px 4px #b31217, 0 2px 8px #000",
              }}
            >
              Nourish your body, fuel your life.
            </span>
          </div>
          <div
            className="motivation-emoji"
            style={{
              background: "linear-gradient(90deg, #b31217 0%, #232323 100%)",
              borderRadius: 22,
              padding: "10px 32px",
              display: "flex",
              alignItems: "center",
              fontSize: 38,
              boxShadow: "0 2px 18px rgba(179,18,23,0.18)",
              border: "2px solid #b31217",
              zIndex: 101,
              marginRight: "32px",
              marginTop: "12px",
              color: "#fff",
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
        {/* Food images row */}
        <div
          className="d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap food-row"
          style={{
            zIndex: 1,
            position: "relative",
            marginTop: "-72px",
          }}
        >
          <style>{`
            @media (max-width: 700px) {
              .food-row {
                margin-top: 24px !important;
              }
              .food-row-img.hide-mobile {
                display: none !important;
              }
            }
          `}</style>

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
        {/* Responsive chat dialog row */}
        <div className="row justify-content-center w-100 m-0">
          {/* Right column: Chat dialog, always full width on mobile */}
          <div className="col-lg-9 col-md-8 col-12">
            <div
              className="chat-recipe-messages"
              style={{
                maxWidth: "1000px",
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
              <style>{`
                @media (max-width: 600px) {
                  .chat-recipe-messages {
                    max-width: 100vw !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                  }
                }
              `}</style>
              {/* Chat heading above input */}
              <div
                style={{
                  textAlign: "center",
                  margin: "0 0 12px 0",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: "1.6rem",
                  background: "linear-gradient(90deg, #b31217 0%, #000 100%)",
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                  padding: "10px 0 4px 0",
                  width: "100%",
                  border: "2px solid #b2f7ef",
                  letterSpacing: 1,
                  position: "relative",
                }}
              >
                Chat About Recipes{" "}
                <LuBot size={28} className="ms-2 align-middle" />
              </div>
              {/* Chat messages area above input section, scrollable with max height and full width */}
              <div
                style={{
                  width: "100%",
                  maxHeight: "480px",
                  minHeight: "180px",
                  overflowY: "auto",
                  paddingBottom: 8,
                  paddingRight: 12,
                  marginBottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  flex: "none",
                  scrollbarColor: "#888 #d3d3d3",
                  scrollbarWidth: "thin",
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, #232323 0%, #b31217 100%)",
                }}
                id="chat-messages-scroll"
              >
                <style>{` 
                  .chat-recipe-messages > div::-webkit-scrollbar {
                    width: 8px;
                    background: #000;
                  }
                  .chat-recipe-messages > div::-webkit-scrollbar-thumb {
                    background: #b31217;
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
                      background: "transparent",
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
                          background:
                            msg.sender === "user"
                              ? "linear-gradient(90deg, #232323 0%, #000 100%)"
                              : "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
                          color: "#fff",
                          borderRadius: 14,
                          boxShadow: "0 4px 18px rgba(179,18,23,0.18)",
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
                              : "2.5px solid #fff",
                          textShadow:
                            msg.sender === "user"
                              ? "none"
                              : "0 2px 8px #b31217, 0 4px 24px #000",
                          letterSpacing: "0.5px",
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
                  background: "linear-gradient(90deg, #b31217 0%, #000 100%)",
                  borderRadius: 14,
                  boxShadow: "0 2px 12px rgba(179,18,23,0.10)",
                  padding: "12px 0 8px 0",
                  border: "2px solid #b2f7ef",
                  marginTop: 18,
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
                  style={{
                    resize: "none",
                    minHeight: 60,
                    maxHeight: 120,
                    background: "#232323",
                    color: "#fff",
                    border: "2px solid #b31217",
                    borderRadius: 10,
                  }}
                />
                <button
                  onClick={handleSend}
                  className="btn btn-primary w-100 chat-recipe-send-btn"
                  disabled={loading}
                  style={{
                    marginTop: 4,
                    background:
                      "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#fff",
                    boxShadow: "0 0 12px #b31217",
                    borderRadius: 10,
                    padding: "0.7rem 2.2rem",
                  }}
                >
                  <LuSendHorizontal size={20} className="me-2" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
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
