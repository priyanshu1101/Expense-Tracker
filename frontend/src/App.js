import './App.css';
import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Layout/Header/Header';
import TotalExpenses from './components/TotalExpenses/TotalExpenses';
import Sidebar from './components/Layout/Sidebar/Sidebar';
import { useState } from 'react';
import Footer from './components/Layout/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Routes>
        <Route path="/" Component={ExpenseTracker} />
        <Route path="/total-expenses" Component={TotalExpenses} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
