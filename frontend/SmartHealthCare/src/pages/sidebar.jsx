import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faCalendarAlt,
  faCreditCard,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Sidebar.css";
import logo from "../assets/logo.png";
import profile from "../assets/visa.jpg";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Medical Care Logo" className="logo-image" />
      </div>
      <ul className="sidebar-menu">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/patient-record" ? "active" : ""}>
          <Link to="/patient-record">
            <FontAwesomeIcon icon={faUser} /> Patient Record
          </Link>
        </li>
        <li className={location.pathname === "/appointment" ? "active" : ""}>
          <Link to="/admin">
            <FontAwesomeIcon icon={faCalendarAlt} /> Appointment
          </Link>
        </li>
        <li className={location.pathname === "/paymentD" ? "active" : ""}>
          <Link to="/paymentD">
            <FontAwesomeIcon icon={faCreditCard} /> Payment
          </Link>
        </li>
        <li className={location.pathname === "/reports" ? "active" : ""}>
          <Link to="/reports">
            <FontAwesomeIcon icon={faChartBar} /> Reports
          </Link>
        </li>
      </ul>
      <div className="profile">
        <img src={profile} alt="John Doe" className="profile-image" />
        <p>John Doe</p>
        <p>Admin</p>
      </div>
    </div>
  );
}

export default Sidebar;
