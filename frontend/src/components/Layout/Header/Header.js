import React from 'react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <div className="burger-icon" onClick={toggleSidebar}>
        &#9776;
      </div>
      <div className="logo">
        Expense Tracker
      </div>
    </div>
  );
}

export default Header;