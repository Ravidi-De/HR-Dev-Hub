import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendar,
  faMoneyBillTransfer,
  faArrowRightToFile,
} from '@fortawesome/free-solid-svg-icons';
import { AdminNavbar, EmployeeNavBar } from '../../../components/common';
import { Dashboard } from '../../../components/common';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateLeaveEMP = () => {
  const { id } = useParams();

  useEffect(() => {
    // Define the complete URL endpoint
    const endpoint = `http://localhost:4444/api/leave/leaves/${id}`;

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
      id: 1,
      name: '',
      reason: '',
      traineeType: '',
      department: '',
      employeeId: '',
      date: '',
      email: '',
    },
  ];

  const [formData, setFormData] = useState(rowsData[0]); // Initialize with the first data object
  const [validation, setValidation] = useState({
    reason: { valid: true, error: '' },
    date: { valid: true, error: '' },
    description: { valid: true, error: '' },
  });

  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText('Payment profile document', {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0), // Black color
    });

    // Add your data to the PDF here using page.drawText or other methods
    let y = 320;
    Object.entries(formData).forEach(([key, value]) => {
      // Exclude the _id field when printing the document
      if (key !== '_id') {
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: y,
          size: 12,
          color: rgb(0, 0, 0),
        });
        y -= 20; // Adjust the vertical position for the next data row
      }
    });

    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF data
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab or download it
    window.open(pdfUrl);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const endpoint = `http://localhost:4444/api/leave/leaves/${id}`;

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

  const navigateBack = () => {
    window.location.href = '/leave-manager/empDashboard'; // Change the URL to navigate
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input field
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let valid = true;
    let error = '';

    if (fieldName === 'reason' || fieldName === 'date') {
      if (value.length==0) {
        valid = false;
        error = 'Value must be included';
      }
    } else if (fieldName === 'description') {
      if (value.length < 15) {
        valid = false;
        error = 'Description must be at least 15 characters';
      }
    }

    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: { valid, error },
    }));
  };

  const isInvalid = () => {
    // Check if any of the fields is invalid
    return (
      !validation.reason.valid ||
      !validation.date.valid ||
      !validation.description.valid
    );
  };

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
          <div className="mb-5">
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
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="employeeId">Trainee ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeID}
                    disabled
                    placeholder="Enter Employee ID"
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
                    className={`form-control ${
                      validation.reason.valid ? '' : 'is-invalid'
                    }`}
                    id="name"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Update Reason"
                  />
                  <div className="invalid-feedback">
                    {validation.reason.error}
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="name">Date</label>
                  <input
                    type="text"
                    className={`form-control ${
                      validation.date.valid ? '' : 'is-invalid'
                    }`}
                    id="name"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Change date"
                  />
                  <div className="invalid-feedback">
                    {validation.date.error}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    className={`form-control ${
                      validation.description.valid ? '' : 'is-invalid'
                    }`}
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter Description"
                  />
                  <div className="invalid-feedback">
                    {validation.description.error}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-danger"
                style={{ color: 'red' }}
                disabled={isInvalid()}
                onClick={handleSubmit}
              >
               Update
              </button>
            </div>
          </form>
        </div>
      </>
    </Dashboard>
  );
}

export default UpdateLeaveEMP;
