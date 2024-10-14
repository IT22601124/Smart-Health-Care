// Import the necessary hooks and components from react-router-dom
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Report.css";

function Report() {
  const navigate = useNavigate(); // Hook to enable navigation

  const handleCreateReport = () => {
    navigate("/add-report"); // Navigates to AddReport.js on button click
  };

  return (
    <div>
      <Sidebar active="reports" /> {/* Sidebar with Reports highlighted */}
      <div className="report-container">
        <h1 className="report-title">Data Analysis and Reporting</h1>

        {/* Top section with reports and analytics */}
        <div className="report-header">
          <div className="tab reports-tab active">Reports</div>
          <div className="tab analytics-tab">Analytics</div>
        </div>

        {/* Cards for creating new reports and summary stats */}
        <div className="report-overview">
          <div className="report-card large-card">
            <button className="create-report-btn" onClick={handleCreateReport}>
              + Create New Patient Report
            </button>
          </div>
          <div className="report-card small-card">
            <h3>200</h3>
            <p>Total Patient Visit</p>
          </div>
          <div className="report-card small-card">
            <h3>100</h3>
            <p>Patient Admissions</p>
          </div>
          <div className="report-card small-card">
            <h3>40%</h3>
            <p>Discharge Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
