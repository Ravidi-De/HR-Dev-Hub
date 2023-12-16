import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFile, faHouse, faEnvelope, faBriefcase, faCalendar, faFileInvoice, faMagnifyingGlass, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import './sidebar.css';

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <div class="sidebar-container" >
            <nav id="sidebar" class="sidebar" >
            <div class="list-group px-2" >
            <form action="">
                <div className="mt-3 p-1 bg-light d-flex rounded box shadow-sm mb-4">
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Search Here"
                            aria-describedby="button-addon1"
                            className="form-control border-0 bg-light"
                        />
                        <div className="input-group-append">
                            <button
                                id="button-addon1"
                                type="submit"
                                className="btn btn-link text-danger"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="top ">
                <ul className="navbar-nav ml-auto px-5">
                    <li className="nav-item ">
                        <div className='bg-light px-4 rounded box' >
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faHome} className='mx-3' /> Home
                            </a>
                        </div>
                    </li>
                    <li className="nav-item mt-3">
                        <div className='bg-light px-4 rounded box'>
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faCalendar} className='mx-3' /> Attendance
                            </a>
                        </div>
                    </li>
                    <li className="nav-item mt-3">
                        <div className='bg-light px-4 rounded box' >
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faMoneyBillTransfer} className='mx-3' /> Payments
                            </a>
                        </div>
                    </li>
                    <li className="nav-item mt-3">
                        <div className='bg-light px-4 rounded box' >
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faEnvelope} className='mx-3' /> Inquiries
                            </a>
                        </div>
                    </li>
                    <li className="nav-item mt-3">
                        <div className='bg-light px-4 rounded box' >
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faBriefcase} className='mx-3' /> Leaves
                            </a>
                        </div>
                    </li>
                </ul>
                <hr className='text-white' />
            </div>
            <div class="bottom">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center px-5">
                        Notifications
                        <span class="badge bg-primary rounded-pill">14</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-5">
                        Reports
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-5">
                       Settings
                    </li>
                </ul>
            </div>
        </div>
            </nav>
            <button class="fas fa-bars" type="button" className="toggle-button" onClick={toggleSidebar} id='button1'>
                <i ></i>
            </button>
        </div>
    );
};

export default Sidebar;
