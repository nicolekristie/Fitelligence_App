import { useState } from "react";
import { useUser } from "../Components/Context/userContext.jsx";

const useChatBot = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newMessage = {
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    try {
      const response = await fetch("/api/chat-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      if (data && data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.response.trim(),
            sender: "bot",
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, I couldn't process your request. Please try again later.",
            sender: "bot",
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I couldn't process your request. Please try again later.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChatBot;
