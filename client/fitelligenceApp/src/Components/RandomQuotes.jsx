import React, { useState } from "react";

const QuoteGenerator = () => {
  const fitnessQuotes = [
    {
      text: "Nothing is impossible; the word itself says ‘I'm possible!",
      author: "Audrey Hepburn",
    },
    {
      text: "The difference between try and triumph is a little umph.",
      author: "Marvin Phillips",
    },
    { text: "The greatest wealth is health.", author: "Virgil" },
    {
      text: "A little progress each day adds up to big results.",
      author: "Satya Nani",
    },
    {
      text: "If it doesn't challenge you, it won't change you.",
      author: "Fred Devito",
    },
    {
      text: "Don't count the days, make the days count.",
      author: "Muhammad Ali",
    },
    { text: "Treat your body like someone you love.", author: "Hannah Corbin" },
    {
      text: "If you give up at the first sign of struggle, you're really not ready to be successful",
      author: "Kevin Hart",
    },
    { text: "I am. I can. I will. I do.", author: "Christine D’Ercole" },
    {
      text: "Take care of your body. It’s the only place you have to live.",
      author: "Jim Rohn",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(() => {
    // Initialize with a random quote when the component mounts
    const randomIndex = Math.floor(Math.random() * fitnessQuotes.length);
    return fitnessQuotes[randomIndex];
  });

  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * fitnessQuotes.length);
    setCurrentQuote(fitnessQuotes[randomIndex]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3
        style={{
          color: "#fff",
          textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
        }}
      >
        Motivational Fitness Quote
      </h3>
      <blockquote>
        <p
          style={{
            fontStyle: "italic",
            color: "#fff",
            fontSize: "1.25rem",
            textShadow: "0 2px 8px #b31217, 0 4px 24px #000",
            marginBottom: 8,
          }}
        >
          "{currentQuote.text}"
        </p>
        <footer
          style={{
            color: "#fff",
            opacity: 0.85,
            fontSize: "1rem",
            textShadow: "0 2px 8px #000",
          }}
        >
          - {currentQuote.author}
        </footer>
      </blockquote>
      <button
        onClick={generateRandomQuote}
        style={{
          background: "linear-gradient(90deg, #b31217 0%, #000 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 24,
          padding: "10px 28px",
          fontWeight: 600,
          fontSize: "1.1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          cursor: "pointer",
          marginTop: 12,
          transition: "background 0.2s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background =
            "linear-gradient(90deg, #b31217 0%, #ff2a2a 100%)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background =
            "linear-gradient(90deg, #b31217 0%, #000 100%)")
        }
      >
        New Quote
      </button>
    </div>
  );
};

export default QuoteGenerator;
