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
import { DatePicker } from "@mui/x-date-pickers";


const CreateActivity = () => {
    const rowsData = [
        {
            activityId: 1,
            name: "BMI-01",
            handType: "LKR 36000",
            sDate: "Intern",
            stdTime: "HR",
            description: "E12345",
        },
        // Add more data objects as needed
    ];
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
    const [formData, setFormData] = useState(rowsData[0]); // Initialize with the first data object
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
                                Add Activities
                            </p>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <form onSubmit={handleSubmit}>

                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="employeeId">Activity ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="activityId"
                                        name="activityId"
                                        value={formData.activityId}
                                        onChange={handleInputChange}
                                        placeholder="Enter activity ID"

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter Name"

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="handType" className="mb-2">Hand Type</label>

                                    <div class="flex">
                                        <div class="flex items-center mr-20">
                                            <input id="inline-radio" type="radio" value="handType" name="handType" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                            <label for="inline-checked-radio" class="ml-2 text-m text-gray-700 dark:text-gray-300">Both</label>
                                        </div>
                                        <div class="flex items-center mr-20">
                                            <input id="inline-radio" type="radio" value="handType" name="handType" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                            <label for="inline-radio" class="ml-2 text-m  text-gray-700 dark:text-gray-300">Left</label>
                                        </div>
                                        <div class="flex items-center mr-20">
                                            <input id="inline-2-radio" type="radio" value="handType" name="handType" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                            <label for="inline-2-radio" class="ml-2 text-m text-gray-700 dark:text-gray-300">Right</label>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="sDate">Start date</label>
                                    <input
                                    datepicker
                                    //    datepicker-orientation="bottom right"
                                        type="date"
                                        className="form-control"
                                        id="sDate"
                                        name="sDate"
                                        // value={formData.baseSalary}
                                        // onChange={handleInputChange}
                                        placeholder="select Date"

                                    />

                                </div>
                            </div>

                            

                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="STDtime">STD Time</label>
                                    <input
                                        datepicker
                                        type="time"
                                        className="form-control"
                                        id="STDtime"
                                        name="STDtimee"
                                        // value={this.onChange}
                                        // onChange={this}
                                        placeholder="Standard time"
                                        
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
                                <div className="form-group mb-5 ">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Description about the activity"
                                        
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center mt-4'>
                            <button type="submit" className="btn btn-danger" style={{ color: 'red' }} onClick={() => setIsAboutModalOpen(!isAboutModalOpen)}>Add</button>
                        </div>
                    </form>

                </div>
            </>

        </Dashboard>
        
    )
}
export default CreateActivity

