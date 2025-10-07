import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaEnvelope, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      {isOpen && (
        <ul>
          <li><Link to="/"><FaHome /> Home</Link></li>
          <li><Link to="/about"><FaInfoCircle /> About</Link></li>
          <li><Link to="/contact"><FaEnvelope /> Contact</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
