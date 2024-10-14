import React from "react";
import Sidebar from "../components/Sidebar";
import "./Main.css"; // Use this for layout styling

function Main() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content"></div>
    </div>
  );
}

export default Main;
