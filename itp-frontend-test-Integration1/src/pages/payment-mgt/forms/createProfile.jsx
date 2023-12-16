import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faMoneyBillTransfer,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { AdminNavbar, Dashboard, Button, EmployeeNavBar } from '../../../components/common';
import { axiosInstance } from '../../../config';
import Swal from 'sweetalert2';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    baseSalary: '',
    allowances: '',
    description: '',
  });
  const [baseSalaryError, setBaseSalaryError] = useState('');
  const [allowancesError, setAllowancesError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateBaseSalary = () => {
    if (!formData.baseSalary) {
      setBaseSalaryError('Base Salary is required');
    } else if (isNaN(formData.baseSalary)) {
      setBaseSalaryError('Base Salary must be a number');
    } else {
      setBaseSalaryError('');
    }
  };

  const validateAllowances = () => {
    if (formData.allowances && isNaN(formData.allowances)) {
      setAllowancesError('Allowances must be a number');
    } else {
      setAllowancesError('');
    }
  };

  const validateDescription = () => {
    if (!formData.description) {
      setDescriptionError('Description is required');
    } else if (formData.description.length < 10) {
      setDescriptionError('Description must be at least 10 characters');
    } else {
      setDescriptionError('');
    }
  };

  const isFormValid = () => {
    return (
      formData.baseSalary &&
      formData.allowances &&
      formData.description &&
      !baseSalaryError &&
      !allowancesError &&
      !descriptionError
    );
  };

  const handleSubmit = (formData) => {
    console.log('Submit button clicked');
    // Validate form fields before submission
    validateBaseSalary();
    validateAllowances();
    validateDescription();

    // Check if there are validation errors
    if (baseSalaryError || allowancesError || descriptionError) {
      console.log('Form has validation errors');
      return; // Prevent form submission if there are errors
    }

    const payload = {
      employeeId: formData.employeeId,
      baseSalary: parseFloat(formData.baseSalary),
      allowances: parseFloat(formData.allowances),
      description: formData.description,
    };

      // Function to fetch payment profiles from the backend
      const fetchPaymentProfiles = async () => {
        try {
          const response = await Axios.post('http://localhost:4444/api/paymentProfile/Allprofiles');
  
          const profilesWithIds = response.data.map((profile, index) => ({
            ...profile,
            id: index + 1, // Generate a unique 'id' based on the index
          }));
          setPaymentProfiles(profilesWithIds);
        } catch (error) {
          console.error('Error fetching payment profiles:', error);
        }
    axiosInstance
      .post('/paymentProfile/profiles', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Payment profile created successfully.',
        });
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK')
          return Toast('Cannot connect with the backend API.', 'error', {});
        Toast(error.response.data.data, 'error', {});
      })
      .finally(() => {
        navigateBack
      })
  };

  const handleSaveButtonClick = () => {
    handleSubmit(formData); // Pass formData to handleSubmit
  };

  const navigateBack = () => {
    window.location.href = '/payment-manager/profiles'; // Change the URL to navigate
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
          ],
        },
      ]}
    >
      <>
        <EmployeeNavBar />
        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <h2 style={{ color: 'red', fontSize: '24px' }}>Enter details</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-Container justify-content-center">
              {/* <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={handleInputChange}
                      value={formData.name}
                      placeholder="Enter Name"
                    />
                  </div>
                </div>
              </div> */}
              <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="employeeId">Trainee ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="employeeId"
                      name="employeeId"
                      onChange={handleInputChange}
                      value={formData.employeeId}
                      placeholder="Enter Employee Id"
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="allowances">Increment</label>
                    <input
                      type="text"
                      className={`form-control ${
                        allowancesError ? 'is-invalid' : ''
                      }`}
                      id="allowances"
                      name="allowances"
                      value={formData.increment}
                      onChange={handleInputChange}
                      onBlur={validateAllowances} // Validate on blur
                      placeholder="Enter allowance amount"
                    />
                    {allowancesError && (
                      <div className="invalid-feedback">{allowancesError}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                {/* Base Salary Input */}
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="baseSalary">Base Salary</label>
                    <input
                      type="text"
                      className={`form-control ${
                        baseSalaryError ? 'is-invalid' : ''
                      }`}
                      id="baseSalary"
                      name="baseSalary"
                      value={formData.baseSalary}
                      onChange={handleInputChange}
                      onBlur={validateBaseSalary} // Validate on blur
                      placeholder="Enter Base Salary"
                    />
                    {baseSalaryError && (
                      <div className="invalid-feedback">{baseSalaryError}</div>
                    )}
                  </div>
                </div>

                {/* Allowances Input */}
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="allowances">Allowances</label>
                    <input
                      type="text"
                      className={`form-control ${
                        allowancesError ? 'is-invalid' : ''
                      }`}
                      id="allowances"
                      name="allowances"
                      value={formData.allowances}
                      onChange={handleInputChange}
                      onBlur={validateAllowances} // Validate on blur
                      placeholder="Enter allowance amount"
                    />
                    {allowancesError && (
                      <div className="invalid-feedback">{allowancesError}</div>
                    )}
                  </div>
                </div>

              </div>
              <div className="row d-flex justify-content-center">
                {/* Description Input */}
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="text"
                      className={`form-control ${
                        descriptionError ? 'is-invalid' : ''
                      }`}
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      onBlur={validateDescription} // Validate on blur
                      placeholder="Enter description"
                    />
                    {descriptionError && (
                      <div className="invalid-feedback">{descriptionError}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ color: 'red' }}
                  disabled={!isFormValid()} // Disable the button if the form is not valid
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    </Dashboard>
  );
};
}
export default CreateProfile
