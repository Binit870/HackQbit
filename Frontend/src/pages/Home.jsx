import React from "react";
import { ShieldCheck, Leaf } from "lucide-react";
import Chatbot from "../components/Chatbot";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-[#F6FAF7] flex flex-col">
      {/* Hero Section */}
      <header
        className="flex flex-col justify-center items-center text-center px-6 md:px-16 flex-grow relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-4xl">
          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="text-[#0A0A0A]">
              Smart Health Diagnostics and{" "}
            </span>
            <span className="font-serif italic text-[#3BB273]">
              Assistance Platform
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Many individuals delay medical consultation due to lack of awareness or
            access. There is a need for an accessible digital platform to understand
            symptoms, receive preliminary assessments, and take timely health
            actions.
          </p>

          {/* Button */}
          <button className="mt-8 px-10 py-3 bg-gradient-to-l from-green-600 to-teal-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-200 shadow-md">
            Get Started
          </button>
        </div>
      </header>
      <Chatbot />
    </div>
  );
}