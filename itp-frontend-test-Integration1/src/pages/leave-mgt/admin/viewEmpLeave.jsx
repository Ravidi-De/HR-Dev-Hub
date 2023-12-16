import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faCalendar,
  faMoneyBillTransfer,
  faArrowRightToFile,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons'
import { AdminNavbar, EmployeeNavBar } from '../../../components/common'
import { Dashboard } from '../../../components/common'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import masLogo from '../../../assets/images/Logo_of_MAS_Holdings.png'

const ViewLeaveAdmin = () => {
  const { id } = useParams()

  useEffect(() => {
    // Define the complete URL endpoint
    const endpoint = `http://localhost:4444/api/leave/leaves/${id}`

    // Make a GET request using Axios to fetch data
    axios
      .get(endpoint)
      .then((response) => {
        if (response.status === 200) {
          setFormData(response.data)
        } else {
          console.error('Error fetching Leaves:', response.status)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [id])

  const rowsData = [
    {
      id: 1,
      name: '',
      reason: '',
      traineeType: '',
      department: '',
      employeeId: 'E',
      date: '',
      email: '',
    },
    // Add more data objects as needed
  ]

  const [formData, setFormData] = useState(rowsData[0]) // Initialize with the first data object

  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 400])

    page.drawText('Payment profile document', {
      y: 350,
      size: 30,
      color: rgb(0, 0, 0), // Black color
    })

    // Add your data to the PDF here using page.drawText or other methods
    let y = 320
    Object.entries(formData).forEach(([key, value]) => {
      // Exclude the _id field when printing the document
      if (key !== '_id') {
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: y,
          size: 12,
          color: rgb(0, 0, 0),
        })
        y -= 20 // Adjust the vertical position for the next data row
      }
    })

    const pdfBytes = await pdfDoc.save()

    // Create a blob from the PDF data
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })

    // Create a URL for the blob
    const pdfUrl = URL.createObjectURL(pdfBlob)

    // Open the PDF in a new tab or download it
    window.open(pdfUrl)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement logic to update the trainee data
    console.log('Updated Trainee Data:', formData)
  }

  const navigateBack = () => {
    window.location.href = '/leave-manager/adminDashboard' // Change the URL to navigate
  }

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/profile-mgt/HRmanager/dashboard',
              name: 'Home',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
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
              path: '/payment-manager/dashboard',
              name: 'Payment',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMoneyBillTransfer}
                />
              ),
            },
            {
              path: '/leave-manager/adminDashboard',
              name: 'Leave',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendarDay}
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
          <div className="mb-5">
            <h2>{formData.name}</h2>
            <h5 className="text-danger">{formData.traineeType}</h5>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col md-2">
              <button
                onClick={createPdf}
                class="btn btn-danger btn-lg active"
                role="button"
                aria-pressed="true"
              >
                PDF{' '}
                <FontAwesomeIcon
                  icon={faArrowRightToFile}
                  style={{ fontSize: 15 }}
                />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="employeeId">Trainee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeID}
                    disabled
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="employeeId">Created Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="createdDate"
                    name="createdDate"
                    value={formData.created_at}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="name">Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.reason}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="name">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.date}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email">Description</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email">Status</label>
                  <input
                    type="status"
                    className="form-control"
                    id="status"
                    name="status"
                    rows="1"
                    value={formData.isHandled}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.isHandled ? 'green' : 'red' }}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email">Message</label>
                  <input
                    type="status"
                    className="form-control"
                    id="status"
                    name="status"
                    rows="1"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-danger"
                style={{ color: 'red' }}
                onClick={navigateBack}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </>
    </Dashboard>
  )
}

export default ViewLeaveAdmin
