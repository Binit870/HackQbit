import React, { useState } from "react";
import symptomData from "../../data/symptom.json";

const Symptoms = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: "",
    existingDisease: "",
    regularMedicine: "",
  });

  const [result, setResult] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredSymptoms = formData.symptoms
      .toLowerCase()
      .split(",")
      .map((s) => s.trim());

    let bestMatch = null;
    let highestMatchCount = 0;

    symptomData.forEach((diseaseObj) => {
      const matchCount = diseaseObj.symptoms.filter((symptom) =>
        enteredSymptoms.includes(symptom.toLowerCase())
      ).length;

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        bestMatch = diseaseObj.disease;
      }
    });

    if (bestMatch && highestMatchCount > 0) {
      setResult(
        `🩺 Based on your symptoms, the most likely condition is: ${bestMatch}.`
      );
    } else {
      setResult(
        "⚠️ No matching disease found. Please check your entered symptoms or consult a doctor for proper diagnosis."
      );
    }

    setShowDisclaimer(true);
  };

  const handleViewHistory = () => {
    alert("🕘 View History feature coming soon!");
  };

  const closeDisclaimer = () => {
    setShowDisclaimer(false);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden p-6"
      style={{
        backgroundImage: "url('/heal-removebg-preview.png')",
        backgroundSize: "1300px auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
        backgroundAttachment: "fixed",
        backgroundColor: "#ecfdf5",
      }}
    >
      {/* 🌿 Left Side Text + Image Section */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10 max-w-md">
        <h1
          className="text-5xl font-extrabold leading-tight drop-shadow-lg 
                     bg-gradient-to-r from-green-500 via-green-500 to-green-700 
                     bg-clip-text text-transparent border-b-4 border-green-700"
        >
          AI POWERED<br />SYMPTOM CHECKER
        </h1>

        <p className="mt-4 text-lg text-gray-700 font-medium">
          Enter your symptoms and AI will suggest possible conditions.
        </p>

        <div className="mt-10">
          <img
            src="/med-removebg-preview.png"
            alt="Health Illustration"
            className="w-[300px] h-[300px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 🌿 Glassmorphism Form Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/40 border border-white/40 shadow-2xl rounded-3xl p-6 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4 drop-shadow-md">
          Check Your Symptoms
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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
              className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-gray-300 rounded-lg p-2 h-20 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-gray-300 rounded-lg p-2 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* ✅ Buttons in One Row */}
          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md hover:from-green-500 hover:to-emerald-700 transition-all"
            >
              Check Symptoms
            </button>

            <button
              type="button"
              onClick={handleViewHistory}
              className="flex-1 backdrop-blur-md bg-white/40 border border-white/40 text-green-800 font-semibold py-2 rounded-lg shadow-md hover:bg-white/60 transition-all"
            >
              View History
            </button>
          </div>
        </form>
      </div>

      {/* ⚠️ Popup Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
            <h3 className="text-xl font-bold text-yellow-700 mb-3">
              ⚠️ Medical Disclaimer
            </h3>
            <p className="text-gray-800 mb-4">{result}</p>
            <p className="text-sm text-gray-600 mb-4">
              This is not a medical diagnosis. Please consult a certified doctor
              for accurate medical advice.
            </p>
            <button
              onClick={closeDisclaimer}
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Symptoms;
