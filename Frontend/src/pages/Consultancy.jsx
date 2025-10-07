import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const doctorsData = [
  {
    id: "d1",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    experience: "12 years",
    hospital: "Fortis Hospital, Mumbai",
    bio: "Expert in treating heart diseases, hypertension, and cholesterol management.",
  },
  {
    id: "d2",
    name: "Dr. Arjun Mehta",
    specialty: "Dermatologist",
    experience: "9 years",
    hospital: "Apollo Clinic, Delhi",
    bio: "Specialist in skin, hair, and nail disorders. Focus on acne, eczema, and allergies.",
  },
  {
    id: "d3",
    name: "Dr. Neha Kapoor",
    specialty: "Psychiatrist",
    experience: "14 years",
    hospital: "MindCare Hospital, Bangalore",
    bio: "Experienced in mental wellness, anxiety, and depression counseling.",
  },
  {
    id: "d4",
    name: "Dr. Rohit Singh",
    specialty: "Nutritionist",
    experience: "8 years",
    hospital: "FitLife Wellness Center, Pune",
    bio: "Helps individuals achieve better health through diet and lifestyle changes.",
  },
  {
    id: "d5",
    name: "Dr. Sneha Verma",
    specialty: "Pediatrician",
    experience: "10 years",
    hospital: "Rainbow Children’s Hospital, Hyderabad",
    bio: "Specialized in child growth, vaccination, and common pediatric care.",
  },
  {
    id: "d6",
    name: "Dr. Karan Patel",
    specialty: "Orthopedic Surgeon",
    experience: "13 years",
    hospital: "Max Hospital, Gurgaon",
    bio: "Expert in bone, joint, and spine treatments. Specializes in sports injuries.",
  },
  {
    id: "d7",
    name: "Dr. Aditi Nair",
    specialty: "Gynecologist",
    experience: "11 years",
    hospital: "Cloudnine Hospital, Kochi",
    bio: "Focused on women's health, prenatal care, and reproductive health counseling.",
  },
  {
    id: "d8",
    name: "Dr. Rajeev Bansal",
    specialty: "ENT Specialist",
    experience: "15 years",
    hospital: "Medanta Hospital, Lucknow",
    bio: "Experienced in ear, nose, and throat disorders. Expert in sinus and hearing issues.",
  },
  {
    id: "d9",
    name: "Dr. Ishita Gupta",
    specialty: "Ophthalmologist",
    experience: "10 years",
    hospital: "Shroff Eye Centre, Delhi",
    bio: "Specialist in cataract, glaucoma, and laser vision correction.",
  },
  {
    id: "d10",
    name: "Dr. Vivek Rao",
    specialty: "Neurologist",
    experience: "16 years",
    hospital: "AIIMS, New Delhi",
    bio: "Expert in treating brain, nerve, and spinal cord disorders such as epilepsy and stroke.",
  },
];

const Consultancy = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const filteredDoctors = filter
    ? doctorsData.filter((doc) =>
        doc.specialty.toLowerCase().includes(filter.toLowerCase())
      )
    : doctorsData;

  const handleConnect = (doctorId) => {
    navigate(`/consult/chat/${doctorId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-800 p-8">
      {/* 🌿 Background Image with slow zoom */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center animate-slow-zoom"
        style={{
          backgroundImage: `url("/consult.jpg")`,
        }}
      ></div>

      {/* 💚 Soft green gradient tint overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-100/70 via-emerald-100/60 to-teal-100/60 backdrop-blur-[2px]"></div>

      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
        🩺 Find a Specialist Doctor
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-12">
        <input
          type="text"
          placeholder="Search by specialty..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 rounded-2xl w-80 bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
        />
      </div>

      {/* Doctor Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white/75 backdrop-blur-xl border border-emerald-100 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02]"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center text-2xl font-bold text-white shadow-md">
              {doc.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{doc.name}</h2>
            <p className="text-emerald-600 font-medium">{doc.specialty}</p>
            <p className="text-gray-600 text-sm mt-2">{doc.hospital}</p>
            <p className="text-gray-500 text-sm italic mt-1">
              {doc.experience} experience
            </p>
            <p className="text-gray-700 text-sm mt-3">{doc.bio}</p>
            <button
              onClick={() => handleConnect(doc.id)}
              className="mt-5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-6 py-2 rounded-full font-medium shadow-md hover:scale-105 transition-transform"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultancy;
