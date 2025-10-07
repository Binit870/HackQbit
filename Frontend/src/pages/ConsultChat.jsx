import React, { useState } from "react";
import API from "../utils/Api";
import { useParams } from "react-router-dom";
import { doctorsData } from "./Consultancy";
import { useAuth } from "../context/AuthContext";

const ConsultChat = () => {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const doctor = doctorsData.find((d) => d.id === doctorId);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: user.name, text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const { data } = await API.post("/consult/chat", { message: input });
      const doctorMsg = { sender: `${doctor.name}`, text: data.reply };
      setMessages((prev) => [...prev, doctorMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section className="min-h-screen bg-cyan-950 text-white p-6 flex flex-col">
      <h1 className="text-2xl mb-4">
        Chat with <span className="text-cyan-300">{doctor.name}</span>{" "}
        <span className="text-sm text-gray-400">({doctor.specialty})</span>
      </h1>

      <div className="flex-1 bg-cyan-900 rounded-lg p-4 overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded-lg w-fit ${
              m.sender === user.name ? "bg-cyan-600 ml-auto" : "bg-gray-700"
            }`}
          >
            <p>{m.text}</p>
            <small className="text-xs text-gray-300">{m.sender}</small>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-3 rounded-lg text-black"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-cyan-600 px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </section>
  );
};

export default ConsultChat;
