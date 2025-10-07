import React, { useState } from "react";
import axios from "axios";

const Symptoms = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: "",
    existingDisease: "",
    regularMedicine: "",
  });

  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setAiResponse(null);

      const res = await axios.post("http://localhost:5000/api/symptoms/check", {
        age: formData.age,
        gender: formData.gender,
        symptoms: formData.symptoms.split(",").map((s) => s.trim()),
      });

      setAiResponse(res.data);
    } catch (error) {
      console.error("AI API Error:", error);
      setAiResponse({
        error: "⚠️ Something went wrong while fetching AI response.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewHistory = () => {
    alert("🕘 View History feature coming soon!");
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/heal-removebg-preview.png')",
        backgroundSize: "1300px auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
        backgroundAttachment: "fixed",
        backgroundColor: "#ecfdf5",
      }}
    >
      {/* 🌿 Left Section */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10 max-w-md">
        <h1
          className="text-6xl font-extrabold leading-tight drop-shadow-lg 
               bg-gradient-to-r from-green-500 via-green-500 to-green-700 
               bg-clip-text text-transparent border-b-4 border-green-700"
        >
          AI POWERED<br />SYMPTOM CHECKER
        </h1>

        <p className="mt-4 text-lg text-gray-700 font-medium">
          Enter your symptoms and let our AI analyze them for you.
        </p>

        <div className="mt-10">
          <img
            src="/med-removebg-preview.png"
            alt="Health Illustration"
            className="w-[350px] h-[350px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 🌿 Form Section */}
      <div className="relative z-10 backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-6 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6 drop-shadow-md">
          Check Your Symptoms
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter Your Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter Your Disease Symptoms
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="e.g. fever, headache, cough..."
              className="w-full border border-gray-300 rounded-lg p-2.5 h-24 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          {/* Existing Disease */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Are You Suffering from Any Disease
            </label>
            <input
              type="text"
              name="existingDisease"
              value={formData.existingDisease}
              onChange={handleChange}
              placeholder="e.g. diabetes, asthma"
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Regular Medicine */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Do You Take Any Medicine Regularly
            </label>
            <input
              type="text"
              name="regularMedicine"
              value={formData.regularMedicine}
              onChange={handleChange}
              placeholder="e.g. Metformin, Vitamin D"
              className="w-full border border-gray-300 rounded-lg p-2.5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-700 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Check Symptoms"}
          </button>

          {/* History Button */}
          <button
            type="button"
            onClick={handleViewHistory}
            className="w-full mt-3 backdrop-blur-md bg-white/30 border border-white/40 text-green-800 font-semibold py-2.5 rounded-lg shadow-md hover:bg-white/50 transition-all"
          >
            View History
          </button>
        </form>

        {/* AI Response */}
        {aiResponse && (
          <div className="mt-6 p-4 bg-white/70 border border-gray-300 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              AI Analysis:
            </h3>

            {aiResponse.error && (
              <p className="text-red-600">{aiResponse.error}</p>
            )}

            {aiResponse.conditions && (
              <ul className="space-y-3">
                {aiResponse.conditions.map((cond, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <p className="font-semibold text-gray-900">{cond.name}</p>
                    <p className="text-sm text-gray-700">{cond.description}</p>
                    <p className="text-sm text-gray-800">
                      <b>Urgency:</b> {cond.urgency_level}
                    </p>
                    {cond.treatments && (
                      <p className="text-sm text-gray-800">
                        <b>Treatments:</b> {cond.treatments}
                      </p>
                    )}
                    {cond.medicine && (
                      <p className="text-sm text-gray-800">
                        <b>Medicine:</b> {cond.medicine}
                      </p>
                    )}
                    <p className="text-sm text-green-700 mt-1">
                      <b>Advice:</b> {cond.cta}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Symptoms;
