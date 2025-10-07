import React, { useState } from "react";

const Symptoms = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: "",
    existingDisease: "",
    regularMedicine: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your entered details:\n" + JSON.stringify(formData, null, 2));
  };

  const handleViewHistory = () => {
    alert("🕘 View History feature coming soon!");
  };

  return (
    <div
      className="relative h-screen flex items-center justify-center overflow-hidden"
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
    className="text-6xl font-extrabold leading-tight drop-shadow-lg 
               bg-gradient-to-r from-green-500 via-green-500 to-green-700 
               bg-clip-text text-transparent border-b-4 border-green-700"
  >
    AI POWERED<br />SYMPTOM CHECKER
  </h1>

  <p className="mt-4 text-lg text-gray-700 font-medium">
    Enter your symptoms and AI will suggest possible conditions.
  </p>

        {/* 💚 Image Below Text */}
        <div className="mt-10">
          <img
            src="/med-removebg-preview.png"
            alt="Health Illustration"
            className="w-[350px] h-[350px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 🌿 Glassmorphism Form Card (centered) */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-700 transition-all"
          >
            Check Symptoms
          </button>

          {/* 🌿 View History Button */}
          <button
            type="button"
            onClick={handleViewHistory}
            className="w-full mt-3 backdrop-blur-md bg-white/30 border border-white/40 text-green-800 font-semibold py-2.5 rounded-lg shadow-md hover:bg-white/50 transition-all"
          >
            View History
          </button>
        </form>
      </div>
    </div>
  );
};

export default Symptoms;
