import React, { useState } from "react";
// import "./Report.css";





const Report = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    phoneNumber: "",
    gender: "",
    maritalStatus: "",
    income: "",
    exemptions: [],
    signature: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.exemptions, value]
          : prev.exemptions.filter((v) => v !== value);
        return { ...prev, exemptions: updated };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Medical Record Submitted Successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="medical-container">
      <h1>Medical Record</h1>

      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <section>
          <h3>Personal Details</h3>
          <div className="grid">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="grid">
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Status */}
        <section>
          <h3>Status</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="Single"
                checked={formData.maritalStatus === "Single"}
                onChange={handleChange}
              />
              Single
            </label>
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="Married"
                checked={formData.maritalStatus === "Married"}
                onChange={handleChange}
              />
              Married
            </label>
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="Divorced"
                checked={formData.maritalStatus === "Divorced"}
                onChange={handleChange}
              />
              Divorced
            </label>
          </div>
        </section>

        {/* Income */}
        <section>
          <h3>Income</h3>
          <input
            type="text"
            name="income"
            placeholder="Enter Annual Income"
            value={formData.income}
            onChange={handleChange}
          />
        </section>

        {/* Exemptions */}
        <section>
          <h3>Exemptions</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="exemptions"
                value="Medical"
                checked={formData.exemptions.includes("Medical")}
                onChange={handleChange}
              />
              Medical
            </label>
            <label>
              <input
                type="checkbox"
                name="exemptions"
                value="Education"
                checked={formData.exemptions.includes("Education")}
                onChange={handleChange}
              />
              Education
            </label>
            <label>
              <input
                type="checkbox"
                name="exemptions"
                value="Disability"
                checked={formData.exemptions.includes("Disability")}
                onChange={handleChange}
              />
              Disability
            </label>
          </div>
        </section>

        {/* Signature */}
        <section>
          <h3>Sign Here</h3>
          <input
            type="text"
            name="signature"
            placeholder="Type your name for signature"
            value={formData.signature}
            onChange={handleChange}
          />
        </section>

        <button type="submit" className="submit-btn">
          Submit Record
        </button>
      </form>
    </div>
  );
};

export default Report;
