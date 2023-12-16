
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faClipboardUser,
    faHome,
    faFileContract,
    faRectangleList,
    faGauge,
    faCircleUser,
    faMagnifyingGlass,
    faFolderOpen,
    faCaretRight,
    faCaretLeft,
    faPenToSquare,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dashboard } from '../../../components/common'
import Modal from '../../../components/common/modal'

// Sample attendance data
const memberData = [
    {
        id: 'M001',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M002',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M003',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M004',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M005',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M006',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M007',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M008',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },
    {
        id: 'M009',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },

    {
        id: 'M010',
        name: 'Dimesha',
        email: 'Dimesha@email.com',
        bDate: '23/08/2000',
        sDate: '11/02/2020',
    },


]

const memberSummaryData = [
    {
        id: 'M010',
        name: 'Dimesha',
        sDate: '11/02/2020',
        activityName: 'Front Liner',
        needling: '1ND',
        threading: '3ZZ',
        pcs: 60,
        avgEff: '20%',
        avgEtt: '30%',
        result: '78%',
    },
    {
        id: 'M010',
        name: 'Dimesha',
        sDate: '11/02/2020',
        activityName: 'Front Liner',
        needling: '2ND',
        threading: '2ZZ',
        pcs: 30,
        avgEff: '70%',
        avgEtt: '90%',
        result: '78%',
    }
]


const Member = () => {
    const [formData, setFormData] = useState(memberData[0]);

    const [formDataSummary, setFormDataSummary] = useState(memberSummaryData[0]);

    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const filteredData = memberData.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    
    const currentData = filteredData.slice(startIndex, endIndex)


    const filteredDataSummary = memberSummaryData.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
    )


    const currentDataSummary =  filteredDataSummary.slice(startIndex, endIndex)

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }
    const navigate = useNavigate();
    const navigateToCreate = () => {
        // 👇️ navigate to /member
        navigate('/training-scl-activity-mgt/member/addMember');
    };

    const navigateSummarry = useNavigate();
    const navigateToSummarySheet = () => {
        // 👇️ navigate to /member
        navigateSummarry('/training-scl-activity-mgt/summarysheet');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement logic to update the trainee data
        console.log('Updated Trainee Data:', formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
                                All Member
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 order-md-2">
                    <div className="container-fluid">
                        <div class="d-flex">
                            <div class="p-2">
                                <form action="" >
                                    <div className="p-1 bg-light d-flex rounded rounded-pill shadow-sm mb-4">
                                        <div className="input-group">
                                            <input
                                                type="search"
                                                placeholder="Search by name"
                                                aria-describedby="button-addon1"
                                                className="form-control border-0 bg-light"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
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
                            <div class="ml-auto p-2" >
                                <button className="text-md bg-[#00AC4F] border-2  border-[#00AC4F] text-[#FFFFFF] hover:bg-[#00AC4F] hover:text-black rounded-lg px-5 py-2.5 my-4 w-32 block mx-auto" onClick={navigateToCreate}>+ Add</button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input position-static"
                                                type="checkbox"
                                                id="blankCheckbox"
                                                value="option1"
                                                aria-label="..."
                                            />
                                        </div>
                                    </th>
                                    <th scope="col">Member ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">BirtDay</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Summary</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((row) => (
                                    <tr key={row.id}>
                                        <td scope="row">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input position-static"
                                                    type="checkbox"
                                                    id="blankCheckbox"
                                                    value="option1"
                                                    aria-label="..."
                                                />
                                            </div>
                                        </td>
                                        <td>{row.id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.bDate}</td>
                                        <td>{row.sDate}</td>

                                        <td>
                                            {/* summary report */}
                                            <button className="btn border-none" onClick={() => setIsSummaryModalOpen(!isSummaryModalOpen)}>
                                                <FontAwesomeIcon
                                                    className="mr-4 text-1x2 text-[#374151]"
                                                    icon={faFolderOpen}
                                                />
                                            </button>
                                        </td>

                                        <td>
                                            {/* update */}
                                            <button className="btn border-none" onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}>
                                                <FontAwesomeIcon
                                                    className="mr-4 text-1x2 text-[#374151]"
                                                    icon={faPenToSquare}
                                                />
                                            </button>
                                        </td>
                                        <td>
                                            {/* delete */}
                                            <button className="btn border-none" onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
                                                <FontAwesomeIcon
                                                    className="mr-4 text-1x2 text-[#E5383B] "
                                                    icon={faTrashCan}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Summary sheet  modal */}
                        <Modal
                            isOpen={isSummaryModalOpen}
                            toggleModal={() => setIsSummaryModalOpen(!isSummaryModalOpen)}
                            title="Update activity"
                            className="w-full lg:w-9/12"
                        >
                            {/* <!-- Main modal --> */}

                            <div className="relative w-full max-w-full max-h-full">
                                {/* <!-- Modal content --> */}

                                {/* <!-- Modal body --> */}
                                <div className="relative w-full max-w-full max-h-full">
                                <div className='row d-flex justify-content-center'>
                                            <div className='col-6'>
                                                <div className="form-group mb-5">
                                                    <label htmlFor="employeeId">Member ID</label>
                                                    
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="employeeId"
                                                        name="employeeId"
                                                        value={formDataSummary.id}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Your id"
                                                        disabled


                                                    />
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div className="form-group mb-5">
                                                    <label htmlFor="name">Name</label>
                                                    
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fullName"
                                                        name="fullName"
                                                        value={formDataSummary.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Your Full Name"
                                                        disabled

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input position-static"
                                                            type="checkbox"
                                                            id="blankCheckbox"
                                                            value="option1"
                                                            aria-label="..."
                                                        />
                                                    </div>
                                                </th>
                                                {/* <th scope="col">Member ID</th>
                                                <th scope="col">Name</th> */}
                                                <th scope="col">Date</th>
                                                <th scope="col">Activity</th>
                                                <th scope="col">Needling</th>
                                                <th scope="col">Threading</th>
                                                <th scope="col">Pcs</th>
                                                <th scope="col">Average EFF</th>
                                                <th scope="col">Average ETT</th>
                                                <th scope="col">Result</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentDataSummary.map((row) => (
                                                <tr key={row.id}>
                                                    <td scope="row">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input position-static"
                                                                type="checkbox"
                                                                id="blankCheckbox"
                                                                value="option1"
                                                                aria-label="..."
                                                            />
                                                        </div>
                                                    </td>
                                                    {/* <td>{row.id}</td>
                                                    <td>{row.name}</td> */}
                                                    <td>{row.sDate}</td>
                                                    <td>{row.activityName}</td>
                                                    <td>{row.needling}</td>
                                                    <td>{row.threading}</td>
                                                    <td>{row.pcs}</td>
                                                    <td>{row.avgEff}</td>
                                                    <td>{row.avgEtt}</td>
                                                    <td>{row.result}</td>



                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                                {/* Modal footer  */}
                                <div className="flex items-center p-3 space-x-3 border-trounded-b ">
                                    <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={navigateToSummarySheet}>Update</button>
                                    <button data-modal-hide="defaultModal" type="button" className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={navigateToSummarySheet}>Download</button>
                                    <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}>Cancel</button>
                                </div>
                            </div>
                        </Modal>


                        {/* update  modal */}
                        <Modal
                            isOpen={isUpdateModalOpen}
                            toggleModal={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
                            title="Update activity"
                            className="w-full lg:w-9/12"
                        >
                            {/* <!-- Main modal --> */}

                            <div className="relative w-full max-w-full max-h-full">
                                {/* <!-- Modal content --> */}

                                {/* <!-- Modal body --> */}
                                <div className="relative w-full max-w-full max-h-full">
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
                                                        disabled

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
                                                        disabled

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
                                {/* Modal footer  */}
                                <div className="flex items-center p-3 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                                    <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setIsUpdateModalOpen(!isUpdateModalOpen)}>Cancel</button>
                                </div>
                            </div>
                        </Modal>

                        {/* delete modal */}
                        <Modal
                            isOpen={isDeleteModalOpen}
                            toggleModal={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                            title="warning"
                            className="w-full lg:w-4/12"
                        >
                            {/* <!-- Main modal --> */}

                            <div className="relative w-full max-w-full max-h-full p-6 space-y-6 h-[40vh]">
                                {/* <!-- Modal content --> */}

                                {/* <!-- Modal body --> */}
                                <div className="relative w-full max-w-full max-h-full">
                                    <div class="p-2 text-center">
                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this member?</h3>
                                        <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>No, cancel</button>
                                    </div>

                                </div>

                            </div>



                        </Modal>
                        <div className="text-center ">
                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn border-none mx-3"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                >
                                    <FontAwesomeIcon
                                        className="mr-4 text-1x2 text-[#E5383B]"
                                        icon={faCaretLeft}
                                    />
                                </button>
                                Page {currentPage} of{' '}
                                {Math.ceil(filteredData.length / itemsPerPage)}
                                <button
                                    className="btn  mx-3 border-none"
                                    onClick={handleNextPage}
                                    disabled={
                                        currentPage ===
                                        Math.ceil(filteredData.length / itemsPerPage)
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="mr-4 text-1x2 text-[#E5383B]"
                                        icon={faCaretRight}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Dashboard>
    )
}

export default Member