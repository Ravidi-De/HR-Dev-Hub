
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


const AddMember = () => {
    const memberData = [
        {
            id: 'M001',
            fullName: 'G.Dimesha K wijerathna',
            firstName: 'Dimesha',
            lastName: 'Wijerathna',
            email: 'Dimesha@email.com',
            phoneNumber:'07569889635',
            gender:'male',
            address:'Panadura',
            bDate: '23/08/2000',
            sDate: '11/02/2020',
            imagepath:'',
            note:'dbsjd ejfnefe jfdedjf',

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
                                Add Member
                            </p>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <form onSubmit={handleSubmit}>

                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
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

                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="name">Name In full</label>
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
                        </div>

                        <div className='row d-flex justify-content-center'>
                           
                            <div className='col-3'>
                                <div className="form-group mb-5">

                                    <label htmlFor="firstName">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstNamee"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter First Name"

                                    />

                                </div>
                            </div>



                            <div className='col-3'>
                                <div className="form-group mb-5">
                                    <label htmlFor="lastName">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Last Name"

                                    />
                                </div>
                            </div>
                           
                            <div className='col-6'>
                                <div className="form-group mb-5 ">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter Email"

                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="phoneNum">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phoneNum"
                                        name="phoneNum"
                                        value={formData.phoneNum}
                                        onChange={handleInputChange}
                                        placeholder="Enter Phone number"

                                    />
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter Address"

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
                                    <label htmlFor="gender" className="mb-2">Gender</label>

                                    <div class="flex">
                                        <div class="flex items-center mr-10">
                                            <input id="inline-radio" type="radio" value="gender" name="handTypgender" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                            <label for="inline-checked-radio" class="ml-2 text-m text-gray-700 dark:text-gray-300">Male</label>
                                        </div>
                                        <div class="flex items-center mr-10">
                                            <input id="inline-radio" type="radio" value="gender" name="gender" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                            <label for="inline-radio" class="ml-2 text-m  text-gray-700 dark:text-gray-300">Female</label>
                                        </div>
                                    </div>

                                </div>
                            </div>

                          

                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="bDate">Birth Date</label>
                                    <input
                                        datepicker
                                        type="date"
                                        className="form-control"
                                        id="bDate"
                                        name="bDate"
                                        // value={formData.baseSalary}
                                        // onChange={handleInputChange}
                                        placeholder="select Date"

                                    />

                                </div>
                            </div>

                        </div>

                        <div className='row d-flex justify-content-center'>
                            <div className='col-6'>
                                <div className="form-group mb-5">
                                    <label htmlFor="note">Note</label>
                                    <textarea
                                        type="text"
                                        className="form-control p-5 "
                                        id="note"
                                        name="note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        placeholder="Enter some other details about employee"

                                    />
                                </div>
                            </div>

                            <div className='col-6'>
                                <label htmlFor="name">Image</label>
                                <div class="flex items-center justify-center w-full">

                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-25 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" />
                                    </label>
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
export default AddMember

