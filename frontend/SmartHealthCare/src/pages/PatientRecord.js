import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faBell,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./PatientRecord.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function PatientRecord() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const handleAddPatientClick = () => {
    navigate("/add-patient");
  };

  // Fetch patient data from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://192.168.8.111:5000/api/patients"); // Update the URL if needed
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatients();
  }, []);

  // Handle update patient
  const handleUpdatePatient = (patientId) => {
    navigate(`/update-patient/${patientId}`); // Navigate to the update form (you'll need to create an update page)
  };

  // Handle delete patient
  const handleDeletePatient = async (patientId) => {
    console.log("Deleting patient with ID:", patientId); // Check patient ID
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://192.168.8.111:5000/api/patients/${patientId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setPatients(patients.filter((patient) => patient._id !== patientId));
          alert("Patient deleted successfully");
        } else {
          console.error("Error deleting patient:", response);
          alert("Error deleting patient");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Error deleting patient");
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="patient-record-container">
        <div className="header">
          <h1>Patient Record Management</h1>
          <div className="header-actions">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button className="add-btn" onClick={handleAddPatientClick}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <FontAwesomeIcon icon={faBell} className="notification-icon" />
          </div>
        </div>

        <div className="card-section">
          <div className="card" onClick={handleAddPatientClick}>
            <FontAwesomeIcon icon={faPlus} className="card-icon" />
            <p>Add New Patient Record</p>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faSearch} className="card-icon" />
            <p>Scan or Search Patient</p>
          </div>
        </div>

        {/* Patients Table */}
        <div className="patients-table">
          <h2>Patient List</h2>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>NIC</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.patientId}</td>
                    <td>{patient.fullName}</td>
                    <td>{patient.email}</td>
                    <td>{patient.mobile}</td>
                    <td>{patient.nic}</td>
                    <td>{new Date(patient.dob).toLocaleDateString()}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.address}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="action-icon edit-icon"
                        onClick={() => handleUpdatePatient(patient._id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="action-icon delete-icon"
                        onClick={() => handleDeletePatient(patient._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No patients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PatientRecord;
