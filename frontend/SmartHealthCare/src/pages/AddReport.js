import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./AddReport.css"; // Assuming you have separate CSS for styling

function AddReport() {
  const [formData, setFormData] = useState({
    patientId: "",
    visitId: "",
    fullName: "",
    age: "",
    gender: "",
    contactNo: "",
    visitDate: "",
    visitTime: "",
    doctorId: "",
    speciality: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.8.111:5000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Report submitted successfully:", data);
        // Optionally reset the form or show success message
      } else {
        throw new Error("Failed to submit report");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Sidebar active="reports" /> {/* Sidebar */}
      <div className="add-report-container">
        <h1 className="add-report-title">Data Analysis and Reporting</h1>
        <div className="form-container">
          <h2>Create New Report</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="Patient ID"
                required
              />
              <input
                type="text"
                name="visitId"
                value={formData.visitId}
                onChange={handleChange}
                placeholder="Visit ID"
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                placeholder="Visit Date"
                required
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
              />
              <input
                type="time"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                placeholder="Visit Time"
                required
              />
            </div>
            <div className="form-row">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="text"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                placeholder="Doctor ID"
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Contact No"
                required
              />
              <input
                type="text"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                placeholder="Speciality"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReport;
