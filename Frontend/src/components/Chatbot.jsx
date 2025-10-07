import React, { useState, useRef } from "react";
<<<<<<< HEAD
import { X, Send, Mic } from "lucide-react";
=======
import { X, Send, Mic, Volume2, VolumeX } from "lucide-react";
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
import API from "../utils/Api"; // ✅ your axios instance

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
<<<<<<< HEAD
=======
  const [isMuted, setIsMuted] = useState(false); // ✅ NEW: Voice toggle state
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
  const recognitionRef = useRef(null);

  // 🎙️ Initialize voice recognition (Speech-to-Text)
  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice input 😞");
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    return recognition;
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initSpeechRecognition();
    }
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  // 🔊 Voice output (Text-to-Speech)
  const speak = (text) => {
<<<<<<< HEAD
=======
    if (isMuted) return; // ✅ Respect mute toggle
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
<<<<<<< HEAD
=======
      window.speechSynthesis.cancel(); // stop any ongoing speech
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
      window.speechSynthesis.speak(utterance);
    }
  };

  // 💬 API call
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
<<<<<<< HEAD
    speak(reply); // 🎧 Bot speaks the response
    setLoading(false);
  };

=======
    speak(reply); // 🎧 Bot speaks the response (only if not muted)
    setLoading(false);
  };

  // ✅ Toggle Mute/Unmute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (!isMuted) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech when muted
    }
  };

>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating Chat Icon (🤖 with Stethoscope) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
<<<<<<< HEAD
          className="bg-white  rounded-full shadow-xl hover:scale-110 g-green-700/20 transition-transform"
=======
          className="bg-white rounded-full shadow-xl hover:scale-110 transition-transform"
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
        >
          <img
            src="/healthbot.png"
            alt="AI Health Assistant"
            className="w-16 h-16 object-contain"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[420px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-green-600 text-white px-5 py-4">
<<<<<<< HEAD
            <h3 className="font-semibold text-lg">Health Assistant</h3>
=======
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">Health Assistant</h3>
              <button
                onClick={toggleMute}
                className="hover:bg-green-700 p-1 rounded-full transition"
                title={isMuted ? "Unmute voice" : "Mute voice"}
              >
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
            </div>

>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 p-1 rounded-full transition"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-xl text-base max-w-[80%] ${
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
          <div className="flex items-center p-4 border-t border-gray-200 bg-white">
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-full ${
                isListening ? "bg-green-500" : "bg-gray-200"
              } hover:bg-green-500 text-white transition`}
            >
              <Mic size={20} />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or speak a message..."
              className="flex-1 mx-3 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition"
              disabled={loading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
