import React, { useState, useRef, useEffect } from "react";
import Textbox from "./Textbox";

const Container = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi there! I'm your Fitness AI Assistant. Need help with fat-burning workouts or diet plans? Let's get started!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (userText) => {
    if (!userText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://api.together.xyz/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful fitness assistant that answers in a friendly and encouraging tone.",
              },
              { role: "user", content: userText },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const aiReply =
        data?.choices?.[0]?.message?.content || "Hmm, no clear reply from the AI.";

      // Add empty AI message placeholder
      setMessages((prev) => [...prev, { sender: "ai", text: "" }]);

      // Simulate typing effect character-by-character
      let i = 0;
      const typingSpeed = 20; // milliseconds per character

      const intervalId = setInterval(() => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg.sender === "ai") {
            lastMsg.text += aiReply.charAt(i);
          }
          return updated;
        });

        i++;
        if (i >= aiReply.length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, typingSpeed);
    } catch (error) {
      console.error("API Error:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ I'm currently out of free request quota or something went wrong. Try again later, or check your API dashboard.",
        },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <main className="w-[90%] h-[72%] rounded-4xl p-5 flex items-center justify-center flex-col sm:w-md md:w-xl lg:w-2xl transition-all">
      <h1 className="mt-10 mb-5 font-bold text-3xl text-center ">
        Fitness AI Assistant
      </h1>
      <div className="w-full min-h-[90%] bg-gray-900 rounded-4xl p-5 flex flex-col shadow-md overflow-y-scroll hide-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user"
                ? "text-right text-white"
                : "text-left text-amber-300"
            } mb-2 text-sm sm:text-md md:text-lg`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator flex gap-1 text-amber-400 text-xl animate-bounce ">
            <span className="typing-dot" id="dot1">
              .
            </span>
            <span className="typing-dot" id="dot2">
              .
            </span>
            <span className="typing-dot" id="dot3">
              .
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <Textbox onSubmit={handleSend} />
    </main>
  );
};

export default Container;