import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendar,
  faEnvelopeOpenText,
  faMoneyBillTransfer,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { EmployeeNavBar } from '../../../components/common';
import { Dashboard } from '../../../components/common';

const RequestQR = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    traineeType: 'Intern',
    category: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement logic to submit the form
    console.log('Form submitted');
  };

  const navigateBack = () => {
    window.location.href = '/attendance-tracker/employeeDashboard';
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

        <div className="d-flex justify-content-start">
          <h1 className="text-danger" style={{ color: 'red', fontSize: '24px' }}>
            Request new QR code
          </h1>
        </div>

        <div className="container">
          <div className="row d-flex justify-content-center mb-5">
            <h2 style={{ color: 'red', fontSize: '24px' }}>
              {formData.name}-{formData.traineeType}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-Container justify-content-center">
              <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <optgroup label="Category 1">
                        <option value="subcat1-1">Subcategory 1-1</option>
                        <option value="subcat1-2">Subcategory 1-2</option>
                        <option value="subcat1-3">Subcategory 1-3</option>
                      </optgroup>
                      <optgroup label="Category 2">
                        <option value="subcat2-1">Subcategory 2-1</option>
                        <option value="subcat2-2">Subcategory 2-2</option>
                        <option value="subcat2-3">Subcategory 2-3</option>
                      </optgroup>
                      <optgroup label="Category 3">
                        <option value="subcat3-1">Subcategory 3-1</option>
                        <option value="subcat3-2">Subcategory 3-2</option>
                        <option value="subcat3-3">Subcategory 3-3</option>
                      </optgroup>
                      <optgroup label="Category 4">
                        <option value="subcat4-1">Subcategory 4-1</option>
                        <option value="subcat4-2">Subcategory 4-2</option>
                        <option value="subcat4-3">Subcategory 4-3</option>
                      </optgroup>
                      <optgroup label="Category 5">
                        <option value="subcat5-1">Subcategory 5-1</option>
                        <option value="subcat5-2">Subcategory 5-2</option>
                        <option value="subcat5-3">Subcategory 5-3</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-3"></div>
              <div className="row d-flex justify-content-center">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                      placeholder="Enter description"
                      rows={4} 
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
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    </Dashboard>
  );
};

export default RequestQR;
