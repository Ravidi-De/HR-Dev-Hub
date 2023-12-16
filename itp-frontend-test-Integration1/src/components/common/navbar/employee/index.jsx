import React, { useState } from 'react';
import logo from '../../../../assets/images/Logo_of_MAS_Holdings.png';
import './navbar.css'; 
import { Navigate } from 'react-router';

const EmployeeNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toHome = () => {
    window.location.href = "/";
  };

  const toLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <nav className={`top-0 p-4 navbar`}
    style={{ justifyContent: 'flex-end' }}>
      {/* Toggle icon for mobile screens */}
      <button
        className="menu-toggle block cursor-pointer md:hidden"
        type="button"
        onClick={toggleMenu}
      >
        <i className={`fas fa-bars ${menuOpen ? 'open' : ''}`}></i>
      </button>

      {/* Menu */}
      <div className={`menu md:flex ${menuOpen ? 'open' : 'hidden'}`}>
        {/* Search Bar */}
        {/* Nav Items */}
        <ul className="flex ml-auto items-center space-x-4">
          <li className="nav-item">
            <a className="nav-link">
              <div className="icons flex gap-4">

                <div className="icon text-red-500 text-2xl" onClick={toHome}>
                  <i className="fas fa-home"></i>
                </div>
                <div className="icon text-red-500 text-2xl">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="icon text-red-500 text-2xl">
                  <i className="fas fa-user"></i>
                </div>
                <div className="icon text-red-500 text-2xl">
                  <i className="fas fa-cog"></i>
                </div>
                <div className="icon text-red-500 text-2xl" onClick={toLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default EmployeeNavBar
