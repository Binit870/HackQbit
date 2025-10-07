import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import API from "../utils/Api"; // ✅ import your configured Axios instance

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ API call directly using your axios instance
  const sendChatMessage = async (message) => {
    try {
      const res = await API.post("/ai/chat", { message });
      return res.data.reply;
    } catch (err) {
      console.error("Chat API Error:", err);
      return "⚠️ Sorry, I couldn't connect to the chatbot server.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    const reply = await sendChatMessage(userMessage);

    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-96 bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
            <h3 className="font-semibold">Health Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    msg.from === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm italic">Thinking...</div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center p-3 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
              disabled={loading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
