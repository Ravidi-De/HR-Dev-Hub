import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  faHome,
  faCalendar,
  faMoneyBillTransfer,
  faCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Button,
  Dashboard,
  Loader,
  Toast,
  EmployeeNavBar,
} from '../../../components/common'
import axios from 'axios';
import Swal from 'sweetalert2'

const CreateSessionPage = () => {
  useEffect(() => {
    document.title = 'Create a Session'
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      employeeID: values.employeeID,
      base_salary: values.base_salary,
      allowances: values.allowances,
      description: values.description,
    }

    const endpoint = `http://localhost:4444/api/paymentProfile/profiles`;
    axios
      .post(endpoint, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Payment profile created succesfully.',
        })
        navigateBack();
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Func: Formik definition
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const formik = useFormik({
    initialValues: {
      employeeID: '',
      base_salary: '',
      allowances: '',
      description: '',
    },
    validationSchema: Yup.object({
      employeeID: Yup.string().required('Please enter a  Employee ID.'),
      base_salary: Yup.number().required('Please enter Base Salary.'),
      allowances: Yup.number().required('Please enter Allowance.'),
      description: Yup.string().required('Please enter a description.'),
    }),
    onSubmit: (values) => handleFormSubmit(values),
  })

  const navigateBack = () => {
    window.location.href = '/payment-manager/profiles'; // Change the URL to navigate
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
              ],
            },
          ]}
        >
          <>
            <EmployeeNavBar />
            <div className="block my-6 mb-12 p-8">
              <p className="text-3xl font-semibold mb-4">
                Create Payment Profile
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="my-8 px-8">
              <div className="form-Container justify-content-center">
                <div className="row d-flex justify-content-center">
                  <div className="col-6">
                    {/* <div className="form-group">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-6">
                    <div className="form-group">
                      <label
                        htmlFor="employeeID"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="..."
                        value={formik.values.employeeID}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.employeeID && formik.touched.employeeID ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.employeeID}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  {/* Base Salary Input */}
                  <div className="col-3">
                    <div className="form-group">
                      <label
                        htmlFor="base_salary"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Base Salary
                      </label>
                      <input
                        type="baseSalary "
                        id="base_salary"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="..."
                        value={formik.values.base_salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.errors.base_salary &&
                      formik.touched.base_salary ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.base_salary}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>

                  {/* Allowances Input */}
                  <div className="col-3">
                    <div className="allowances">
                      <label
                        htmlFor="allowances"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Allowances:
                      </label>
                      <input
                        id="allowances"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the allowance amount"
                        value={formik.values.allowances}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.errors.allowances && formik.touched.allowances ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.allowances}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  {/* Description Input */}
                  <div className="col-6">
                    <div className="form-group">
                      <label
                        htmlFor="session-desc"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.description &&
                      formik.touched.description ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.description}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div className='row d-flex justify-content-center'>
                <Button
                type="submit"
                className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
              >
                <FontAwesomeIcon
                  className="text-xl mx-4 hover:cursor-pointer"
                  icon={faCheck}
                />
                Create Profile
              </Button>
              </div>
              </div>
            </form>
          </>
        </Dashboard>
      )}
    </>
  )
}

export default CreateSessionPage
