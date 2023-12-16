
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
    faTrashCan,
    faPenToSquare,
    faCaretLeft,
    faCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import {
    Dashboard,
    Button,
} from '../../../components/common'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Modal from '../../../components/common/modal'


// Sample attendance data
const activityData = [
    {
        id: 'A001',
        name: 'BMB-01',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A002',
        name: 'BMB-02',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A003',
        name: 'BMB-03',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A004',
        name: 'BMB-04',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A005',
        name: 'BMB-05',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A006',
        name: 'BMB-06',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A007',
        name: 'BMB-07',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A008',
        name: 'BMB-08',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A009',
        name: 'BMB-09',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },
    {
        id: 'A010',
        name: 'BMB-10',
        stdTime: '7sec',
        handType: 'Left',
        startDate: '11 Aug 2020',
    },


]


const Activity = () => {
    const navigate = useNavigate();
    const navigateToCreate = () => {
        // 👇️ navigate to /contacts
        navigate('/training-scl-activity-mgt/activity/create');
    };
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const filteredData = activityData.filter((row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const currentData = filteredData.slice(startIndex, endIndex)

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

    const rowsData = [
        {
            id: 1,
            name: "John Doe",
            baseSalary: "LKR 36000",
            traineeType: "Intern",
            department: "HR",
            employeeId: "E12345",
            allowances: "LKR 78000",
            email: "john@example.com",
        },
        // Add more data objects as needed
    ];
    const [formData, setFormData] = useState(rowsData[0]); // Initialize with the first data object

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
                                All Activities
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
                                    <th scope="col">Activity ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">STD Time</th>
                                    <th scope="col">Hand Type</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Update</th>
                                    {/* <th scope="col"> New QR</th> */}
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
                                        <td>{row.stdTime}</td>
                                        <td>{row.handType}</td>
                                        <td>{row.startDate}</td>
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
                                            <div className='col-3'>
                                                <div className="form-group mb-5">
                                                    <label htmlFor="employeeId">Activity ID</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="activityId"
                                                        name="activityId"
                                                        value={formData.activityId}
                                                        placeholder="Enter activity ID"

                                                    />
                                                </div>
                                            </div>

                                            <div className='col-3'>
                                                <div className="form-group mb-5">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        disabled
                                                        placeholder="Enter Name"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row d-flex justify-content-center'>
                                            <div className='col-6'>
                                                <div className="form-group mb-5">
                                                    <label htmlFor="name" className="mb-2">Hand Type</label>

                                                    <div class="flex">
                                                        <div class="flex items-center mr-20">
                                                            <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                                            <label for="inline-checked-radio" class="ml-2 text-m text-gray-700 dark:text-gray-300">Both</label>
                                                        </div>
                                                        <div class="flex items-center mr-20">
                                                            <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
                                                            <label for="inline-radio" class="ml-2 text-m  text-gray-700 dark:text-gray-300">Left</label>
                                                        </div>
                                                        <div class="flex items-center mr-20">
                                                            <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:border-gray-600" />
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
                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this activity?</h3>
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

export default Activity