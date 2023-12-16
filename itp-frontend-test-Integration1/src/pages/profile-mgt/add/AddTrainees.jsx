import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const AddTrainees = () => {

    const [employeeID, setEmployeeID] = useState("")
    const [fullName, setFullName] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [pName, setPName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [noOfExp, setNoOfExp] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [address, setAddress] = useState("")
    const [isEmployeeIDEmpty, setEmployeeIDEmpty] = useState(false)
    const [isNameEmpty, setIsNameEmpty] = useState(false)
    const [isFNameEmpty, setIsFNameEmpty] = useState(false);
    const [isLNameEmpty, setIsLNameEmpty] = useState(false);
    const [isPNameEmpty, setIsPNameEmpty] = useState(false)
    const [isdateOfBirthEmpty, setIsdateOfBirthEmpty] = useState(false)
    const [isnoOfExpEmpty, setIsnoOfExpEmpty] = useState(false)
    const [isgenderEmpty, setIsgenderEmpty] = useState(false)
    const [isemailEmpty, setIsemailEmpty] = useState(false)
    const [isphoneNoEmpty, setIsphoneNoEmpty] = useState(false)
    const [isaddressNoEmpty, setIsaddressEmpty] = useState(false)



    const [errors, setErrors] = useState({});

    const handleEmployeeIDChange = (e) => {
        const value = event.target.value;
        setEmployeeID(e.target.value);
        setEmployeeIDEmpty(value.trim() === '');
    };

    const handleFullNameChange = (e) => {
        const value = event.target.value;
        setFullName(e.target.value);
        setIsNameEmpty(value.trim() === '');
    };

    const handleFNameChange = (e) => {
        const value = event.target.value;
        setFName(e.target.value);
        setIsFNameEmpty(value.trim() === '');
    };

    const handleLNameChange = (e) => {
        const value = event.target.value;
        setLName(e.target.value);
        setIsLNameEmpty(value.trim() === '');
    };

    const handlePNameChange = (e) => {
        const value = event.target.value;
        setPName(e.target.value);
        setIsPNameEmpty(value.trim() === '');
    };

    const handleDateOfBirthChange = (e) => {
        const value = event.target.value;
        setDateOfBirth(e.target.value);
        setIsdateOfBirthEmpty(value.trim() === '');
    };

    const handleNoOfExpChange = (e) => {
        const value = event.target.value;
        setNoOfExp(e.target.value);
        setIsnoOfExpEmpty(value.trim() === '');
    };

    const handleGenderChange = (e) => {
        const value = event.target.value;
        setGender(e.target.value);
        setIsgenderEmpty(value.trim() === '');
    };

    const handleEmailChange = (e) => {
        const value = event.target.value;
        setEmail(e.target.value);
        setIsemailEmpty(value.trim() === '');
    };

    const handlePhoneNoChange = (e) => {
        const value = event.target.value;
        setPhoneNo(e.target.value);
        setIsphoneNoEmpty(value.trim() === '');
    };

    const handleAddressChange = (e) => {
        const value = event.target.value;
        setAddress(e.target.value);
        setIsaddressEmpty(value.trim() === '');
    };

    const rowsData = [
        {
            id: 1,
            name: "John Doe",
            date: "2023-09-01",
            traineeType: "Intern",
            department: "HR",
            employeeId: "E12345",
            birthday: "1995-05-15",
            email: "john@example.com",
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



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            employeeID: employeeID,
            fullName: fullName,
            fName: fName,
            lName: lName,
            pName: pName,
            dateOfBirth: dateOfBirth,
            noOfExp: noOfExp,
            gender: gender,
            email: email,
            phoneNo: phoneNo,
            address: address,
            age: age
        };

        try {
            const response = await axios.post('http://localhost:4000/post/add', formDataToSend);

            console.log('Response from the API:', response);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Employee profile created successfully.',
                });

                window.location.reload();
                // Clear the form after successful submission
                setFormData({
                    employeeID: '',
                    fullName: '',
                    employeeID: '',
                    fullName: '',
                    fName: '',
                    lName: '',
                    pName: '',
                    dateOfBirth: '',
                    noOfExp: '',
                    gender: '',
                    email: '',
                    phoneNo: '',
                    address: '',
                    age: ''

                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while adding the employee', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };


    useEffect(() => {

        const [year, month, day] = formData.birthday.split('-');


        setBirthdateInputs({ day, month, year });
    }, [formData.birthday]);

    const [birthdateInputs, setBirthdateInputs] = useState({ day: '', month: '', year: '' });


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
                    <h1 style={{ fontSize: '32px' }}>Add New Trainees</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2">Name in Full</label>
                                <input
                                    type="text"
                                    className={`form-control ${isNameEmpty ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={fullName}
                                    onChange={handleFullNameChange}
                                    onBlur={() => setIsNameEmpty(fullName.trim() === '')}
                                />
                                {isNameEmpty && (
                                    <div className="invalid-feedback">Name is required</div>
                                )}
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="employeeId" className="mb-2">Trainee ID</label>
                                <input
                                    type="text"
                                    className={`form-control ${isEmployeeIDEmpty ? 'is-invalid' : ''}`}
                                    id="employeeId"
                                    name="employeeId"
                                    placeholder="Enter Employee ID"
                                    value={employeeID}
                                    onChange={handleEmployeeIDChange}
                                    required 
                                    onBlur={() => setIsNameEmpty(fullName.trim() === '')}
                                />
                                {isNameEmpty && (
                                    <div className="invalid-feedback">ID is required</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 mt-2">First Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${isFNameEmpty ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={fName}
                                    onChange={handleFNameChange}
                                    onBlur={() => setIsFNameEmpty(fullName.trim() === '')}
                                />
                                {isFNameEmpty && (
                                    <div className="invalid-feedback">First Name is required</div>
                                )}
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 mt-2">Last Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${isLNameEmpty ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={lName}
                                    onChange={handleLNameChange}
                                    onBlur={() => setIsLNameEmpty(fullName.trim() === '')}
                                />
                                {isLNameEmpty && (
                                    <div className="invalid-feedback">Last Name is required</div>
                                )}
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="email" className="mb-2 mt-2">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${isemailEmpty ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={handleLNameChange}
                                    onBlur={() => setIsemailEmpty(fullName.trim() === '')}
                                />
                                {isemailEmpty && (
                                    <div className="invalid-feedback">Email is required</div>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="name" className="mb-2 mt-2">Prefered Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${isPNameEmpty ? 'is-invalid' : ''}`}
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={pName}
                                    onChange={handlePNameChange}
                                    onBlur={() => setIsPNameEmpty(fullName.trim() === '')}
                                />
                                {isLNameEmpty && (
                                    <div className="invalid-feedback">Prefered Name is required</div>
                                )}
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label htmlFor="employeeId" className="mb-2 mt-2">Phone Number</label>
                                <input
                                    type="number"
                                    className={`form-control ${isphoneNoEmpty ? 'is-invalid' : ''}`}
                                    id="employeeId"
                                    name="employeeId"
                                    placeholder="Enter Phone number"
                                    value={phoneNo}
                                    onChange={handleLNameChange}
                                    onBlur={() => setIsphoneNoEmpty(fullName.trim() === '')}
                                />
                                {isphoneNoEmpty && (
                                    <div className="invalid-feedback">Phone number is required</div>
                                )}
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
                                            className={`form-control ${isdateOfBirthEmpty ? 'is-invalid' : ''}`}
                                            id="birthdayDay"
                                            name="day"
                                            placeholder="Enter Day"
                                            value={dateOfBirth}
                                            onChange={handleLNameChange}
                                            onBlur={() => setIsdateOfBirthEmpty(fullName.trim() === '')}
                                        />
                                        {isLNameEmpty && (
                                            <div className="invalid-feedback">Birthday is required</div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className="form-group">
                                        <label htmlFor="birthdayMonth" className="mb-2 mt-2">Month</label>
                                        <input
                                            type="number"
                                            className={`form-control ${isdateOfBirthEmpty ? 'is-invalid' : ''}`}
                                            id="birthdayMonth"
                                            name="month"
                                            placeholder="Enter Month"
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className="form-group">
                                        <label htmlFor="birthdayYear" className="mb-2 mt-2">Year</label>
                                        <input
                                            type="number"
                                            className={`form-control ${isdateOfBirthEmpty ? 'is-invalid' : ''}`}
                                            id="birthdayYear"
                                            name="year"
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
                                    className={`form-control ${isnoOfExpEmpty ? 'is-invalid' : ''}`}
                                    id="experience"
                                    name="date"
                                    value={noOfExp}
                                    onChange={handleLNameChange}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" className="mb-2 mt-2">Address</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                                        value={address}
                                        onChange={handleAddressChange}>

                                    </textarea>
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
                                        className={`form-control ${isgenderEmpty ? 'is-invalid' : ''}`}
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios1"
                                        checked
                                        style={{ marginRight: '5px', marginTop: '3px' }} // Adjust margin and spacing'
                                        value={gender}
                                        onChange={handleLNameChange}
                                    onBlur={() => setIsLNameEmpty(fullName.trim() === '')}
                                />
                                {isLNameEmpty && (
                                    <div className="invalid-feedback">Last Name is required</div>
                                )}
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
                                marginLeft: '20px'
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

                    </div>

                </form>
            </div>
        </Dashboard>
    )
}

export default AddTrainees