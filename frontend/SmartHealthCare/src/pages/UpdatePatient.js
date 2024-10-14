import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./UpdatePatient.css";

function UpdatePatient() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    nic: "",
    address: "",
    dob: "",
    gender: "",
    patientId: "",
    admitDate: "",
    weight: "",
    height: "",
    bloodGroup: "",
    notes: "",
  });

  // Fetch the existing patient data by ID
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          `http://192.168.8.111:5000/api/patients/${patientId}`
        );
        const data = await response.json();
        setFormData(data); // Populate the form with existing data
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, [patientId]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update patient data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://192.168.8.111:5000/api/patients/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Patient updated successfully");
        navigate("/patient-record"); // Navigate back to the patient list
      } else {
        alert("Error updating patient");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Error updating patient");
    }
  };

  return (
    <div>
      <Sidebar active="patientRecord" />
      <div className="update-patient-container">
        <h1 className="page-title">Update Patient Information</h1>
        <div className="update-patient-form">
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
                    value={formData.dob.substring(0, 10)} // Format to 'YYYY-MM-DD'
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
                    value={formData.admitDate.substring(0, 10)}
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
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/patient-record")}
              >
                Cancel
              </button>
              <button type="submit" className="update-btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePatient;
