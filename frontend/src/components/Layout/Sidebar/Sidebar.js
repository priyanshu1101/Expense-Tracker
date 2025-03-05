import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        className={`overlay ${isSidebarOpen ? "visible" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">Expense Tracker</div>
        <nav className="sidebar-links">
          <button
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => handleNavigation("/")}
          >
            Show Expenses
          </button>
          <button
            className={location.pathname === "/total-expenses" ? "active" : ""}
            onClick={() => handleNavigation("/total-expenses")}
          >
            Total Expenses
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
