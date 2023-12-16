
import React from "react";
import { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dashboard, Modal } from "../../../components/common";
import {
    faArrowRightFromBracket,
    faClipboardUser,
    faHome,
    faLayerGroup,
    faFileContract,
    faRectangleList,
    faGauge,
    faCircleUser,
} from '@fortawesome/free-solid-svg-icons'


const SummarySheet = () => {
    const memberData = [
        {
            id: 'M001',
            fullName: 'G.Dimesha K wijerathna',
            firstName: 'Dimesha',
            lastName: 'Wijerathna',
            email: 'Dimesha@email.com',
            phoneNumber: '07569889635',
            gender: 'male',
            address: 'Panadura',
            bDate: '23/08/2000',
            sDate: '11/02/2020',
            imagepath: '',
            note: 'dbsjd ejfnefe jfdedjf',

        },
        // Add more data objects as needed
    ];
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
    const [formData, setFormData] = useState(memberData[0]); // Initialize with the first data object
    const createPdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        page.drawText('Report', {
            x: 50,
            y: 350,
            size: 30,
            color: rgb(0, 0, 0), // Black color
        });

        // Add your data to the PDF here using page.drawText or other methods
        let y = 320;
        rowsData.forEach((data) => {
            Object.entries(data).forEach(([key, value]) => {
                page.drawText(`${key}: ${value}`, {
                    x: 50,
                    y: y,
                    size: 12,
                    color: rgb(0, 0, 0),
                });
                y -= 20; // Adjust the vertical position for the next data row
            });
        });

        const pdfBytes = await pdfDoc.save();

        // Create a blob from the PDF data
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a URL for the blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab or download it
        window.open(pdfUrl);
    };
    const onChange = (value) => {
        console.log(value);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement logic to update the trainee data
        console.log('Updated Trainee Data:', formData);
    };

    // const navigateBack = () => {
    //     window.location.href = "/payment-manager/profiles"; // Change the URL to navigate
    // };

    return (
        <Dashboard
            sectionLinks={[
                {
                    section: 'Options',
                    children: [
                        {
                            path: '/',
                            name: 'Home',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faHome}
                                />
                            ),
                        },
                        {
                            path: '/training-scl-activity-mgt/dashboard',
                            name: 'Dashboard',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faGauge}
                                />
                            ),
                        },
                        {
                            path: '/sessions/view',
                            name: 'Profile',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faCircleUser}
                                />
                            ),
                        },
                        {
                            path: '/training-scl-activity-mgt/activity',
                            name: 'Activity',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faRectangleList}
                                />
                            ),
                        },
                        {
                            path: '/training-scl-activity-mgt/member',
                            name: 'Member',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faClipboardUser}
                                />
                            ),
                        },
                        {
                            path: '/training-scl-activity-mgt/summarysheet',
                            name: 'Summary',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faFileContract}
                                />
                            ),
                        },
                        {
                            path: '/logout',
                            name: 'Logout',
                            icon: () => (
                                <FontAwesomeIcon
                                    className="mr-4 text-xl text-gray-400"
                                    icon={faArrowRightFromBracket}
                                />
                            ),
                        },
                    ],
                },
            ]}
        >
            <>
                <div className="grid grid-cols-4" style={{ margin: '0px' }}>
                    <div className="content col-span-3 px-12 py-8">
                        <div className="block my-6">
                            <p className="text-3xl text-[#FFA14E] font-bold mb-4">
                                Update Summary
                            </p>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <form onSubmit={handleSubmit}>

                        <div className='row d-flex justify-content-center'>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="employeeId">Member ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="memberId"
                                        name="memberId"
                                        value={formData.memberId}
                                        onChange={handleInputChange}
                                        placeholder="Enter member ID"

                                    />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="epfNum">EPF Num</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="epfNum"
                                        name="epfNum"
                                        value={formData.epfNum}
                                        onChange={handleInputChange}
                                        placeholder="Enter EPF Num"

                                    />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="fullName">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Full Name"

                                    />
                                </div>
                            </div>

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="result">Evaluation test result</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="result"
                                        name="result"
                                        value={formData.result}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your final result"

                                    />
                                </div>
                            </div>
                        </div>

                        <div className='row d-flex justify-content-center'>

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="sDate">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="sDate"
                                        name="sDate"
                                        value={formData.sDate}
                                        onChange={handleInputChange}
                                        placeholder="Select Date"

                                    />
                                </div>
                            </div>



                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="lastName">Activity</label>

                                    <select id="countries" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a activity</option>
                                        <option value="Induction">Induction</option>
                                        <option value="Hand Exercise">Hand Exercise</option>
                                        <option value="Fundamental activities">Fundamental activities</option>
                                        <option value="Loop exercise">Loop exercise</option>
                                        <option value="Straight sewing">Straight sewing</option>
                                        <option value="Curve sewing">Curve sewing</option>
                                        <option value="tacking center part">tacking center part</option>
                                    </select>

                                </div>
                            </div>

                            <div className='col-3'>
                                <div className="form-group mb-5 ">
                                    <label htmlFor="Pcs">Pcs</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Pcs"
                                        name="Pcs"
                                        value={formData.Pcs}
                                        onChange={handleInputChange}
                                        placeholder="Enter num of Pcs"

                                    />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="form-group mb-5 ">
                                    <label htmlFor="stdTime">Std Time(Second)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="stdTime"
                                        name="stdTime"
                                        value={formData.stdTime}
                                        onChange={handleInputChange}
                                        placeholder="Enter STD time"

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="cycleTime">5Pcs Cycle Timimg</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cycleTime"
                                        name="cycleTime"
                                        value={formData.cycleTime}
                                        onChange={handleInputChange}
                                        placeholder="Enter Cycle time"

                                    />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="avgEFF">Average Eff</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="avgEFF"
                                        name="avgEFF"
                                        value={formData.avgEFF}
                                        onChange={handleInputChange}
                                        placeholder="Enter average EFF"

                                    />
                                </div>
                            </div>

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="avgFTT">Average FTT</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="avgFTT"
                                        name="avgFTT"
                                        value={formData.avgFTT}
                                        onChange={handleInputChange}
                                        placeholder="Enter Average ETT"

                                    />
                                </div>
                            </div>

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="address">Extra work</label>
                                    <select id="countries" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a extra work</option>
                                        <option value="Cenetr part-Bra(SSB)">Cenetr part-Bra(SSB)</option>
                                        <option value="Back part O/L-Bra(SSB)">Back part O/L-Bra(SSB)</option>
                                        <option value="Blend tacking-Sport Bra(SSB)">Blend tacking-Sport Bra(SSB)</option>
                                        <option value="Rib making-TShirt(TSH)">Rib making-TShirt(TSH)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='row d-flex justify-content-center'>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="sDate">Needle Changing</label>
                                    <select id="countries" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a needle</option>
                                        <option value="1ND">1ND</option>
                                        <option value="2ND">2ND</option>
                                        <option value="3ZZ">3ZZ</option>
                                        <option value="AZZ">AZZ</option>
                                        <option value="2UW/3UW">2UW/3UW</option>
                                        <option value="2UL/3UL">2UL/3UL</option>
                                        <option value="AGA">AGA</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="gender">Threading</label>

                                    <select id="countries" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a threading</option>
                                        <option value="1ND">1ND</option>
                                        <option value="2ND">2ND</option>
                                        <option value="3ZZ">3ZZ</option>
                                        <option value="AZZ">AZZ</option>
                                        <option value="2UW/3UW">2UW/3UW</option>
                                        <option value="2UL/3UL">2UL/3UL</option>
                                        <option value="AGA">AGA</option>
                                    </select>

                                </div>
                            </div>



                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="bDate">Use Tape</label>
                                    <select id="countries" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a activity</option>
                                        <option value="SP1">SP1</option>
                                        <option value="SPCM">SPCM</option>
                                        
                                    </select>

                                </div>
                            </div>

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="bDate">Foot Change</label>
                                    <select id="countries" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a foot type</option>
                                        <option value="1ND">1ND</option>
                                        <option value="2ND">2ND</option>
                                      
                                    </select>

                                </div>
                            </div>


                        </div>



                        <div className='d-flex justify-content-center mt-4'>
                            <button type="submit" className="btn btn-danger" style={{ color: 'red' }} onClick={() => setIsAboutModalOpen(!isAboutModalOpen)}>Update</button>
                        </div>
                    </form>

                </div>
            </>

        </Dashboard>

    )
}
export default SummarySheet

