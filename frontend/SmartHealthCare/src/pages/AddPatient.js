import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios"; // Add axios import
import "./AddPatient.css";

function AddPatient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    nic: "",
    address: "",
    dob: "", // Add this for date of birth
    gender: "", // Add this for gender
    patientId: "",
    admitDate: "",
    weight: "",
    height: "",
    bloodGroup: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://192.168.8.111:5000/api/patients",
        formData
      );
      console.log("Patient added successfully", response.data);
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Error adding patient.");
    }
  };

  return (
    <div>
      <Sidebar active="patientRecord" />
      <div className="add-patient-container">
        <h1 className="page-title">
          Patient Record Management &gt; Add patient
        </h1>
        <div className="add-patient-form">
          <form onSubmit={handleSubmit}>
            <div className="form-cards-container">
              <div className="form-card">
                <h3>1. Personal Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile No</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>NIC</label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-card">
                <h3>2. Medical Information</h3>
                <div className="form-group">
                  <label>Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Admit Date</label>
                  <input
                    type="date"
                    name="admitDate"
                    value={formData.admitDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Weight</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Height</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Special Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
