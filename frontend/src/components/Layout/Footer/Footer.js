import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Expense Tracker | Made with ❤️ by Priyanshu</p>
    </footer>
  );
};

export default Footer;
