import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/emergency.png";
import ambulanceIcon from "../assets/ambulance.png";

const Emergency = () => {
  const [showDoctorPage, setShowDoctorPage] = useState(false);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);

  const doctorsData = [
    {
      doctor_id: "101",
      name: "Dr. Priya Sharma",
      specialization: "Cardiology",
      contact_number: "9876543210",
      status: "online",
    },
    {
      doctor_id: "102",
      name: "Dr. Rahul Singh",
      specialization: "General Physician",
      contact_number: "9988776655",
      status: "offline",
    },
    {
      doctor_id: "103",
      name: "Dr. Anjali Verma",
      specialization: "Pediatrics",
      contact_number: "9012345678",
      status: "online",
    },
    {
      doctor_id: "104",
      name: "Dr. Kumar Gupta",
      specialization: "Orthopedics",
      contact_number: "8765432109",
      status: "on-duty",
    },
    {
      doctor_id: "105",
      name: "Dr. Sneha Patil",
      specialization: "Dermatology",
      contact_number: "9123456789",
      status: "online",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    emergencyType: "",
    description: "",
    emergencyContactName: "", // Merged SOS contact fields
    emergencyContactNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [notifiedDoctor, setNotifiedDoctor] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });
    setNotifiedDoctor(null);

    // Consolidated validation for all form fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.contactNumber ||
      !formData.emergencyType ||
      !formData.description ||
      !formData.emergencyContactName ||
      !formData.emergencyContactNumber
    ) {
      setMessage({ type: "error", text: "❌ Please fill all required fields, including SOS contact." });
      setIsLoading(false);
      return;
    }

    const onlineDoctors = doctorsData.filter(doc => doc.status === 'online');
    const selectedDoctor = onlineDoctors[Math.floor(Math.random() * onlineDoctors.length)];
    
    let statusMessage = selectedDoctor ? "Doctor is available" : "No doctor is available";

    console.log("Emergency submitted with all details:", {
      ...formData,
      notifiedDoctor: selectedDoctor,
    });

    setMessage({ type: "success", text: `✅ Emergency submitted! ${statusMessage}` });
    setNotifiedDoctor(selectedDoctor);

    setFormData({
      firstName: "",
      lastName: "",
      contactNumber: "",
      emergencyType: "",
      description: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    });
    
    setIsLoading(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleOpenDoctors = () => {
    setShowDoctorPage(true);
    setShowEmergencyForm(false);
  };

  const handleOpenEmergencyForm = () => {
    setShowEmergencyForm(true);
    setShowDoctorPage(false);
  };

  const handleBackToMain = () => {
    setShowDoctorPage(false);
    setShowEmergencyForm(false);
  };

  const getRandomDoctors = () => {
    const shuffled = [...doctorsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white overflow-hidden p-4">
      <img
        src={logo}
        alt="Emergency Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm z-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {!showDoctorPage && !showEmergencyForm ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full max-w-6xl mx-auto py-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex-1 min-w-[300px] max-w-[400px] bg-transparent backdrop-blur-md p-8 rounded-3xl text-center shadow-2xl hover:shadow-3xl border border-white/40 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img src={ambulanceIcon} alt="Ambulance" className="w-28 h-28 mb-6 filter drop-shadow-lg" />
            <h2 className="text-3xl font-extrabold text-white mb-3">Emergency Call</h2>
            <p className="text-lg text-white mb-6 leading-relaxed">
              For immediate medical assistance, dial our dedicated emergency line. Help is on the way!
            </p>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 1.968a1 1 0 01-.108.974l-1.65 1.65a9.004 9.004 0 005.972 5.972l1.65-1.65a1 1 0 01.974-.108l1.967.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              Call 112
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex-1 min-w-[300px] max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl border border-white/20 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <h1
              className="text-3xl font-extrabold text-red-300 text-center mb-8"
              style={{
                textShadow: "0px 0px 8px rgba(255,0,0,0.6)",
              }}
            >
              Emergency Actions
            </h1>
            
            <motion.button
              onClick={handleOpenEmergencyForm}
              className="w-full px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Emergency
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleOpenDoctors}
              className="w-full px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Available Doctors/Contact
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      ) : showDoctorPage ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-red-300">Available Doctors/Contact</h2>
            <motion.button
              onClick={handleBackToMain}
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </motion.button>
          </div>
          
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {getRandomDoctors().map((doctor) => (
              <motion.div
                key={doctor.doctor_id}
                variants={itemVariants}
                className="p-4 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-colors duration-200"
              >
                <h4 className="font-bold text-lg">Name: {doctor.name}</h4>
                <p className="text-sm text-gray-300">Specialization: {doctor.specialization}</p>
                <p className="text-sm text-gray-300">Contact: <a href={`tel:${doctor.contact_number}`} className="underline text-blue-300 hover:text-blue-200">{doctor.contact_number}</a></p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl mx-auto backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-red-300">Emergency  Form</h2>
            <motion.button
              onClick={handleBackToMain}
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="Enter Your  Name *"
                value={formData.firstName}
                onChange={handleChange}
                className="input-field text-white"
                required
              />
    
            </div>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number *"
              value={formData.contactNumber}
              onChange={handleChange}
              className="input-field text-white"
              required
            />
           
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-lg mt-4">Emergency SOS Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="emergencyContactName"
                  placeholder="SOS Contact Name *"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className="input-field text-white"
                  required
                />
                <input
                  type="text"
                  name="emergencyContactNumber"
                  placeholder="SOS Contact Number *"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                  className="input-field text-white"
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-6 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Emergency"
              )}
            </motion.button>
          </form>

          {message.text && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 text-center text-lg font-semibold ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              <p>{message.text}</p>
              {notifiedDoctor && message.type === "success" && (
                <p className="mt-2 text-sm text-gray-300">
                  A notification has been sent to **{notifiedDoctor.name}** ({notifiedDoctor.specialization}).
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Emergency;