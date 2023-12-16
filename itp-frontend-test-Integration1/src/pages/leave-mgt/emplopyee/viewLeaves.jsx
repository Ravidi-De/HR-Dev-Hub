import React, { useState, useEffect } from 'react'
import Axios from 'axios' // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEye,
  faTrash,
  faFilter,
  faPen,
  faPrint,
  faMagnifyingGlass,
  faCalendar,
  faMoneyBillTransfer,
  faHome,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, EmployeeNavBar } from '../../../components/common'
export const databar = [
  ['Element', 'Density', { role: 'style' }],
  ['Copper', 8.94, '#b87333'],
  ['Silver', 10.49, 'silver'],
  ['Gold', 19.3, 'gold'],
  ['Platinum', 21.45, 'color: #e5e4e2'],
]
import { pdf } from '@react-pdf/renderer'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import PDF from '../component/PDF.jsx'
import styles from '../assets/paymentProfile.css?inline'
import Cookies from 'js-cookie';

const ViewLeavesEMP = () => {
  const rowsData = [
    {
      id: 21,
      name: 'Ava Miller',
      baseSalary: 'LKR 64000',
      traineeType: 'Employee',
      department: 'Sales',
      employeeId: 'E01234',
      date: 'LKR 12000',
      email: 'ava@example.com',
    },
  ]
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [leaveData, setLeaveData] = useState([]) // State to hold leaves

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const filteredData = rowsData.filter(
    (row) =>
      (selectedDepartment === 'All' || row.department === selectedDepartment) &&
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
    const inputValue = e.target.value.toLowerCase()
    setSearchQuery(inputValue)
    setCurrentPage(1)
  }

  const handleFilter = () => {
    setCurrentPage(1)
  }

  // const navigate = useNavigate()

  useEffect(() => {
    // Function to fetch leaves from the backend
    const fetchEmpLeaves = async () => {
      const employeeID = Cookies.get('employeeID')

      try {
        const response = await Axios.get(
          'http://localhost:4444/api/leave/empAllLeaves/' + employeeID
        )

        const leavesWithIds = response.data.map((leave, index) => ({
          ...leave,
          id: index + 1,
        }))
        setLeaveData(leavesWithIds)
      } catch (error) {
        console.error('Error fetching leaves:', error)
      }
    }

    // Call the fetchEmpLeaves function when the component mounts
    fetchEmpLeaves()
  }, [])

  // State variable to store the selected _id
  const [selectedId, setSelectedId] = useState(null)
  const navigate = useNavigate() // Initialize useNavigate

  // Function to set the selected _id when the eye button is clicked
  const handleViewClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id)
    // Set the selected _id in state
    setSelectedId(_id)

    // Use navigate within the onClick function
    navigate(`/leave-manager/empView/${_id}`)
  }

  const handleUpdateClick = (_id) => {
    // Store the _id in session storage
    sessionStorage.setItem('selectedId', _id)
    // Set the selected _id in state
    setSelectedId(_id)

    // Use navigate within the onClick function
    navigate(`/leave-manager/empUpdate/${_id}`)
  }

  const handlePrint = () => {
    const pdfDoc = (
      <PDF sampleData={leaveData} /> // Pass leave data to PDF
    )

    pdf(pdfDoc)
      .toBlob()
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = 'leaves.pdf'
        a.style.display = 'none'

        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        URL.revokeObjectURL(blobUrl)
      })
  }

  const handleDeleteClick = async (_id) => {
    try {
      const response = await fetch(
        `http://localhost:4444/api/leave/leaves/${_id}`,
        {
          method: 'DELETE',
        }
      )

      if (response.status === 204) {
        // Success
        Swal.fire({
          icon: 'success',
          title: 'leave Deleted',
          showConfirmButton: false,
          timer: 1500, // Display for 1.5 seconds
        })

        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload()
        }, 1500) // Adjust the delay as needed
      } else if (response.status === 404) {
        // leave not found
        Swal.fire({
          icon: 'error',
          title: 'leave not found',
          text: 'The specified leave does not exist.',
        })
      } else {
        // Internal Server Error or other errors
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the leave. Please try again later.',
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the leave. Please try again later.',
      })
    }
  }

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/attendance-tracker/employeeDashboard',
              name: 'Attendance',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendar}
                />
              ),
            },
            {
              path: '/leave-manager/empDashboard',
              name: 'Leaves',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendarDays}
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
              Leaves
            </h1>
          </div>
          <div className="d-flex justify-content-end">
            <div className="mr-2">
              <button className="btn btn-danger" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> Print
              </button>
            </div>
            <div className="mr-2">
              <button
                className="btn btn-danger"
                onClick={() => navigate('/leave-manager/create')}
              >
                <FontAwesomeIcon icon={faPen} /> new leave
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
          {leaveData.length > 0 ? (
            <div className={`table-responsive ${styles.responsiveTable}`}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Requested date</th>
                    <th scope="col">status</th>
                    <th scope="col">View</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveData.map((leave) => (
                    <tr key={leave._id}>
                      <th scope="row">{leave.id}</th>
                      <td>{leave.reason}</td>
                      <td>{leave.date}</td>
                      <td>{leave.description}</td>
                      <td>{leave.created_at}</td>
                      <td>
                        <button
                          className={
                            leave.isHandled
                              ? 'btn btn-success'
                              : 'btn btn-danger'
                          }
                          id="updateRecord"
                          name="updateRecord"
                          onClick={() => handleUpdateClick(record._id)}
                        >
                          <FontAwesomeIcon
                            className="mr-1 text-2x1 text-dark"
                            icon={faCheck}
                          />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleViewClick(leave._id)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleUpdateClick(leave._id)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteClick(leave._id)}
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
            <p>No leaves available.</p>
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

export default ViewLeavesEMP
