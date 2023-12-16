import React, { useState, useEffect } from 'react'
import Axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEye,
  faTrash,
  faFilter,
  faPen,
  faDashboard,
} from '@fortawesome/free-solid-svg-icons'
import {
  faMagnifyingGlass,
  faCalendar,
  faMoneyBillTransfer,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../components/common'
export const databar = [
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#b87333'],
  ['Silver', 10.49, 'silver'],
  ['Gold', 19.3, 'gold'],
  ['Platinum', 21.45, 'color: #e5e4e2'],
]

import { useNavigate } from 'react-router-dom'
import { EmployeeNavBar } from '../../../components/common'

const EmployeeProfileDashboard = () => {
  const [formData, setFormData] = useState({ name: '' }); // State for search query
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
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [EmployeeProfiles, setEmployeeProfiles] = useState([]); // State to hold Employee profiles

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }
 
  const filteredData = EmployeeProfiles.filter(
    (row) =>
      (row.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // const filteredData = EmployeeProfiles.filter((record) => //payment profile ekt oyge DB eken ena object eka danna
  //   record.fullName.toLowerCase().includes(searchQuery)
  // );

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

  const handleFilter = () => {
    setCurrentPage(1)
  }

  // const navigate = useNavigate()

  useEffect(() => {
    // Function to fetch Employee profiles from the backend
    const fetchEmployeeProfiles = async () => {
      try {
        const response = await Axios.get('http://localhost:4000/post/getall');

        const profilesWithIds = response.data.map((profile, index) => ({
          ...profile,
          id: index + 1, // Generate a unique 'id' based on the index
        }));
        setEmployeeProfiles(profilesWithIds);
      } catch (error) {
        console.error('Error fetching Employee profiles:', error);
      }
    };

    // Call the fetchEmployeeProfiles function when the component mounts
    fetchEmployeeProfiles();
  }, []);

  // State variable to store the selected _id
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to set the selected _id when the eye button is clicked
  const handleViewClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id);
    // Set the selected _id in state
    setSelectedId(_id);

    // Use navigate within the onClick function
    navigate(`/profile-mgt/ViewEmpProfile/profile/${_id}`);
  };

  const handleUpdateClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id);
    // Set the selected _id in state
    setSelectedId(_id);
    // Use navigate within the onClick function
    navigate(`/profile-mgt/UpdateTrainee/update/${_id}`);
  };

  const handleDeleteClick = async (_id) => {
    try {
      const response = await fetch(`http://localhost:4000/post/${_id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {

        Swal.fire({
          icon: 'success',
          title: 'Profile Deleted',
          text: 'Employee profile created successfully.',
        });

        window.location.reload();

      } else if (response.status === 400) {
        // Profile not found
        Swal.fire({
          icon: 'error',
          title: 'Profile not found',
          text: 'The specified profile does not exist.',
        });
      } else {
        // Internal Server Error or other errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the profile. Please try again later.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the profile. Please try again later.',
      });
    }
  };

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/',
              name: 'Home',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/profile-mgt/HRmanager/dashboard',
              name: 'Dashboard',
              icon: () => (
                  <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faDashboard}
                  />
              ),
          },
            {
              path: '/attendance-tracker/adminDashboard',
              name: 'Attendance',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendar}
                />
              ),
            },
            {
              path: '/Employee-manager/dashboard',
              name: 'Employee',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMoneyBillTransfer}
                />
              ),
            },
          ],
        },
      ]}
    >
      <>
        <EmployeeNavBar />
        <div className="container">
          <div className="d-flex justify-content-start">
            <h1
              className="text-danger"
              style={{ color: 'red', fontSize: '24px' }}
            >
              Employee Profiles
            </h1>
          </div>
          <div className="d-flex justify-content-end">
            <div className="mr-2">
              <button
                className="btn btn-danger"
                onClick={() => navigate('/Employee-manager/profiles/create')}
              >
                <FontAwesomeIcon icon={faPen} /> new profile
              </button>
            </div>
            <div className="mr-2">
              <button className="btn btn-danger" onClick={handleFilter}>
                <FontAwesomeIcon icon={faFilter} /> Filter
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="col-3">
              <form action="">
                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Search by Name"
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
          </div>
          {EmployeeProfiles.length > 0 ? (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {/* <th scope="col">Name</th>
                  <th scope="col">Department</th> */}
                    <th scope="col">Employee ID</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    {/* <th scope="col">Email</th> */}
                    <th scope="col">View</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {EmployeeProfiles.map((profile) => (
                    <tr key={profile._id}>
                      <th scope="row">{profile.id}</th>
                      {/* <td>{profile.fullName }</td> */}
                      {/* <td>{profile.department}</td> */}
                      <td>{profile.employeeID}</td>
                      <td>{profile.fullName}</td>
                      <td>{profile.fName}</td>
                      <td>{profile.lName}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleViewClick(profile._id)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleUpdateClick(profile._id)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger"
                          onClick={() => handleDeleteClick(profile._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No Employee profiles available.</p>
          )}

          <div className="text-center ">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger mx-3"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              Page {currentPage} of{' '}
              {Math.ceil(filteredData.length / itemsPerPage)}
              <button
                className="btn btn-danger mx-3"
                onClick={handleNextPage}
                disabled={
                  currentPage === Math.ceil(filteredData.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    </Dashboard>
  )
}

export default EmployeeProfileDashboard
