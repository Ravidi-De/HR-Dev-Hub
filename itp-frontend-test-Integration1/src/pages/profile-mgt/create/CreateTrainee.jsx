import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    faArrowRightFromBracket,
    faClipboardUser,
    faComment,
    faFilePdf,
    faHome,
    faLayerGroup,
    faQuestionCircle,
    faPrint,
    faSave,
    faSignature,
} from '@fortawesome/free-solid-svg-icons'
import { PDFDocument, rgb } from 'pdf-lib';
import {
    Calendar,
    Dashboard,
    Greeting,
    MiniCard,
} from '../../../components/common'
import { Navigate } from 'react-router-dom';

const CreateTrainee = () => {
    const { id } = useParams();

  useEffect(() => {
    // Define the complete URL endpoint
    const endpoint = `http://localhost:4000/api/paymentProfile/profiles/${id}`;

    // Make a GET request using Axios to fetch data
    axios
      .get(endpoint)
      .then((response) => {
        if (response.status === 200) {
          setFormData(response.data);
        } else {
          console.error('Error fetching profile:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

    const rowsData = [
        {
            employeeID: "",
            fullName: "",
            fName: "",
            lName: "",
            pName: "",
            dateOfBirth: "",
            noOfExp: "",
            gender: "",
            email: "",
            phoneNo: "",
            address: ""
        },
        // Add more data objects as needed
    ];

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

   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   

    const navigateBack = () => {
        window.location.href = "/profile-mgt/SignaturePad/signature"; // Change the URL to navigate
      };

const handleSubmit = (e) => {
    e.preventDefault();
  
    const endpoint = `http://localhost:4444/post/update/${id}`;

    console.log(formData)

    axios
      .put(endpoint, formData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Profile updated successfully');
          navigateBack();
        } else {
          console.error('Error updating profile:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
            <div className='container'>
                <div className="mb-5 mt-5">
                 <h1 style={{ fontSize: '32px' }}>{formData.name}</h1>
                    <h5 className='text-danger'>{formData.traineeType}</h5>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2" >Name in Full</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.fullName}
                                    placeholder="Enter Name"
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="employeeId" className="mb-2">Trainee ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="employeeId"
                                    name="employeeId"
                                    value={formData.employeeID}
                                    placeholder="Enter Employee ID"
                                />
                            </div>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 mt-2">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    
                                    value={formData.fName}
                                    placeholder="Enter Name"
                                />
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 mt-2">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.lName}
                                    placeholder="Enter Name"
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="email" className="mb-2 mt-2">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Enter Email"
                                />
                            </div>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 mt-2">Prefered Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.pName}
                                    placeholder="Enter Name"
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="employeeId" className="mb-2 mt-2">Phone Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="employeeId"
                                    name="employeeId"value={formData.phoneNo}
                                    placeholder="Enter Employee ID"
                                />
                            </div>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='row'>
                                <div className='col-2'>
                                    <div className="form-group">
                                        <label htmlFor="birthdayDay" className="mb-2 mt-2">Day</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="birthdayDay"
                                            name="day"
                                            value={formData.dateOfBirth}
                                            placeholder="Enter Day"
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className="form-group">
                                        <label htmlFor="birthdayMonth" className="mb-2 mt-2">Month</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="birthdayMonth"
                                            name="month"
                                            value={formData.dateOfBirth}
                                            placeholder="Enter Month"
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className="form-group">
                                        <label htmlFor="birthdayYear" className="mb-2 mt-2">Year</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="birthdayYear"
                                            name="year"
                                            value={formData.dateOfBirth}
                                            placeholder="Enter Year"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="employeeId" className="mb-2 mt-2">Upload CV</label>
                                <input className="form-control" type='file' />
                            </div>

                        </div>
                    </div>
                    <div className='row' >
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="date" className="mb-2 mt-2">Number of Experiences</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="experience"
                                    name="date"
                                    value={formData.noOfExp}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="mb-2 mt-2">Address</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"value={formData.address} ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='col-6'>
                            <div>
                                <label htmlFor="date" className="mb-2">Gender</label>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios1"
                                        value="Male"
                                        checked
                                        style={{ marginRight: '5px', marginTop: '3px' }} // Adjust margin and spacing
                                    />
                                    <label
                                        class="form-check-label"
                                        for="exampleRadios1"
                                        style={{ fontSize: '16px' }} // Adjust font size
                                    >
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input" className="mb-5"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios2"
                                        value="Female"
                                        style={{ marginRight: '5px', marginTop: '3px' }} // Adjust margin and spacing
                                    />
                                    <label
                                        class="form-check-label" 
                                        for="exampleRadios2"
                                        style={{ fontSize: '16px' }} // Adjust font size
                                    >
                                        Female
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <button
                            
                            type="submit"
                            style={{
                                fontSize: '18px',
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: '2px solid transparent',
                                cursor: 'pointer',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                transition: 'background-color 0.3s ease, color 0.3s ease, borderColor 0.3s ease',
                                marginLeft:'20px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = 'red';
                                e.target.style.borderColor = 'red';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'red';
                                e.target.style.color = 'white';
                                e.target.style.borderColor = 'transparent';
                            }}
                        >
                            <FontAwesomeIcon icon={faSave} style={{ marginRight: '8px' }} />
                            Save Changes
                        </button>

                        <button
                            onClick={createPdf}
                            style={{
                                fontSize: '18px',
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                transition: 'background-color 0.3s ease',
                                marginLeft: 'auto', // Push the second button to the left
                                marginRight: '70px', // Push the third button to the right
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = 'red';
                                e.target.style.borderColor = 'red';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'red';
                                e.target.style.color = 'white';
                                e.target.style.borderColor = 'transparent';
                            }}
                        >
                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: '8px' }} />
                            Generate PDF
                        </button>

                        <button
                            onClick={navigateBack}
                            style={{
                                fontSize: '18px',
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                                transition: 'background-color 0.3s ease',
                                marginLeft: 'auto', // Push the second button to the left
                                marginRight: '70px', // Push the third button to the right
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = 'red';
                                e.target.style.borderColor = 'red';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'red';
                                e.target.style.color = 'white';
                                e.target.style.borderColor = 'transparent';
                            }}
                        >
                            <FontAwesomeIcon icon={faSignature} style={{ marginRight: '8px' }} />
                            Add Signature
                        </button>
                    </div>

                </form>
            </div>
        </Dashboard>
    )
}

export default CreateTrainee