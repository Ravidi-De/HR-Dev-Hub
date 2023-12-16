import React from "react";
import { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faComment, faArrowRightFromBracket, faClipboardUser, faHome, faLayerGroup, faQuestion, faLocation, faLocationArrow, faLocationPin, faQuestionCircle, } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Calendar,
    Dashboard,
    Greeting,
    MiniCard,
} from '../../../components/common'


const SendInquiries = () => {
    useEffect(() => {
        document.title = 'Inquiries';
    }, []);

    return (

        <Dashboard
            sectionLinks={[
                {
                    section: 'Options',
                    children: [
                        {
                            path: '/profile-mgt/ViewTrainees/view',
                            name: 'View Trainees',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-3xl text-gray-300"
                                    icon={faComment}
                                />
                            ),
                        },
                        {
                            path: '/profile-mgt/CreateTrainee/create',
                            name: 'Add New Trainee',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-3xl text-gray-300"
                                    icon={faClipboardUser}
                                />
                            ),
                        },
                        {
                            path: '/profile-mgt/HRmanager/dashboard',
                            name: 'Dashboard',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-3xl text-gray-300"
                                    icon={faHome}
                                />
                            ),
                        },
                        {
                            path: '/profile-mgt/SendInquries/Inquiries',
                            name: 'Inquiries',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-3xl text-gray-300"
                                    icon={faQuestionCircle}
                                />
                            ),
                        },
                        {
                            path: '/logout',
                            name: 'Logout',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-3xl text-gray-300"
                                    icon={faArrowRightFromBracket}
                                />
                            ),
                        },
                        
                    ],
                },
            ]}
        >
            <div className="container">
                <div className="row">
                    <div className="col-4 mt-4 mr-20 ml-10" style={{ maxWidth: '300px', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '10px' }}>
                        <div className="col-12 mx-3">
                            <FontAwesomeIcon icon={faPhone} style={{ fontSize: 25 }} />
                        </div>
                        <div className="col-12 mt-2">
                            <h3 className="text-danger">Customer Support</h3>
                        </div>
                        <div className="col-12 mt-2">
                            <p>call  +94 071 025 1256</p>
                        </div>
                    </div>

                    <div className="col-4 mr-20 mt-4" style={{ maxWidth: '300px', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '10px' }}>
                        <div className="col-12 mx-3">
                            <FontAwesomeIcon icon={faQuestion} style={{ fontSize: 25 }} />
                        </div>
                        <div className="col-12 mt-2">
                            <h3 className="text-danger">General Questions</h3>
                        </div>
                        <div className="col-12 mt-2">
                            <p>email - example@gmail.com</p>
                        </div>
                    </div>
                    <div className="col-4 mt-4" style={{ maxWidth: '300px', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '10px' }}>
                        <div className="col-12 mx-3">
                            <FontAwesomeIcon icon={faLocationPin} style={{ fontSize: 25 }} />
                        </div>
                        <div className="col-12 mt-2">
                            <h3 className="text-danger">Address</h3>
                        </div>
                        <div className="col-12 mt-2">
                            <p>Unit 8012- 8014, Chandaka Industrial Estate,
                                Colombo 0000</p>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <h1 className="text-danger">Send us your Inquiries</h1>
                    <p className="text-dak">Let’s discuss your project and find out what we can do to provide value.</p>
                </div>
                <div>
                    <form>
                        <div className="row">
                            <div className="col-8">
                                <div className="col-12">
                                    <div class="form-group">
                                        <label for="exampleFormControlInput1">Subject</label>
                                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1">Inquiry Brief</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 px-5">
                                <div className="col-12">
                                    <div class="form-group">
                                        <label for="exampleFormControlSelect1">Type:</label>
                                        <select class="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-danger mt-5 col-6 p-3">Send Inquiry</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </Dashboard>
    );
}

export default SendInquiries