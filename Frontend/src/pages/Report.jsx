import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/report.png";

const Report = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    reportFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, reportFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    if (!formData.firstName || !formData.lastName || !formData.gender) {
      setMessage({ type: "error", text: "❌ Please fill all required fields." });
      setIsLoading(false);
      return;
    }

    setMessage({ type: "success", text: "✅ Medical Record Submitted Successfully!" });

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      reportFile: null,
    });

    setAnalysis(null);

    setTimeout(() => {
      setMessage({ type: "", text: "" });
      setIsLoading(false);
    }, 3000);
  };

  const handleAnalyze = async () => {
    if (!formData.reportFile) return alert("Upload a report first");
    setAnalyzing(true);

    const formDataObj = new FormData();
    formDataObj.append("reportFile", formData.reportFile);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formDataObj,
      });
      const data = await response.json();
      setAnalysis(data.analyzed);
    } catch (error) {
      alert("Error analyzing report");
    } finally {
      setAnalyzing(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-gray-900 bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100">

      {/* 🌿 Animated background overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom opacity-60"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>

      {/* 💫 Floating glowing shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-teal-300 rounded-full blur-3xl opacity-25 animate-float-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-green-200 rounded-full blur-3xl opacity-10 animate-float"></div>

      {/* 🩺 Glowing wave background */}
      <div className="absolute bottom-0 left-0 w-[200%] h-40 z-0 opacity-25 animate-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <pattern id="wavePattern" x="0" y="0" width="400" height="200" patternUnits="userSpaceOnUse">
              <path d="M0,100 Q50,60 100,100 T200,100 T300,100 T400,100" stroke="#10b981" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="1600" height="200" fill="url(#wavePattern)" />
        </svg>
      </div>

      {/* 🧾 Report Card */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 backdrop-blur-2xl bg-white/70 p-8 rounded-3xl shadow-2xl border border-white/80 w-full max-w-md flex flex-col justify-center mx-auto transition-all duration-300 hover:shadow-green-300/40"
      >
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center mb-6 text-green-800 drop-shadow-sm">
          Report Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleChange}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <p className="font-semibold mb-1 text-gray-800">Gender *</p>
            {["Male", "Female", "Other"].map((option) => (
              <label key={option} className="mr-3 text-gray-800">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="mr-1 accent-green-600"
                  required
                />
                {option}
              </label>
            ))}
          </div>

          {/* Upload Report */}
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Upload Report</h3>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleChange}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full transition"
            />
            {formData.reportFile && (
              <p className="mt-2 text-gray-700 text-sm">{formData.reportFile.name} uploaded</p>
            )}
            <button
              type="button"
              onClick={handleAnalyze}
              className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold text-lg hover:shadow-lg transition-all"
              disabled={analyzing}
            >
              {analyzing ? "Analyzing..." : "Analyze Report"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit Record"
            )}
          </button>
        </form>

        {/* Message */}
        {message.text && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Analyzed Data */}
        {analysis && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-300 text-gray-900">
            <h2 className="text-xl font-bold mb-2 text-green-800">Analyzed Data</h2>
            <p><strong>Name:</strong> {analysis.name}</p>
            <p><strong>Age:</strong> {analysis.age}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Report;
