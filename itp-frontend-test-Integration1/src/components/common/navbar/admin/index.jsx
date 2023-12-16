import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import logo from '../../../../assets/images/Logo_of_MAS_Holdings.png';
import actor from '../../../../assets/images/actor1.jpg';
import './navbar.css'
import BorderStyle from 'pdf-lib/cjs/core/annotation/BorderStyle';

const AdminNavbar = () => {

    return (
        <div className="navbar">
            <div className='row p-3'>
                <div className='col-4'>
                    <a className="navbar-brand logo" href="#">
                        <img src={logo} width="40%" height="30" alt="CompanyLogo" />
                    </a>
                </div>
                <div className='col-8 '>
                    <div className='row'>
                        <div className='col-4 mt-3'>
                            <form action="">
                                <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                    <div className="input-group">
                                        <input
                                            type="search"
                                            placeholder="Search Here"
                                            aria-describedby="button-addon1"
                                            className="form-control border-0 "
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
                        </div>
                        <div className='col-1 mx-5 mt-4'>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                                <label className="form-check-label" for="flexSwitchCheckChecked">Live</label>
                            </div>
                        </div>
                        <div className='col-2 mt-3'>
                            <div className="form-group">
                                <select className="form-control" id="exampleFormControlSelect1" style={{ borderRadius: 10 }}>
                                    <option>English</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-1 mt-3 d-flex justify-content-center'>
                            <div className='border' style={{ height: 'min-content', padding: 8, borderRadius: 10 }}>
                                <FontAwesomeIcon icon={faBell} style={{ fontSize: 30, color: '#C0C0C0' }} />
                            </div>
                        </div>
                        <div className='col-2 mt-3 d-flex'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={actor} className='img-fluid' style={{ borderRadius: 20, }} />
                                </div>
                                <div className='col-8 bg-white' style={{ borderRadius: 20 }}>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <h5>Name</h5>
                                            <p>ID: 1234567</p>
                                        </div>
                                        <div className='col-3'>
                                            <div className="dropdown mt-2">
                                                <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" href="#">Logout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
