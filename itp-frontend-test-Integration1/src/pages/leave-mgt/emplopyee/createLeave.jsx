import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';


const CreateLeave = () => {
  useEffect(() => {
    document.title = 'Create leave request'
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    // const employeeID = getSessionEmployeeID();  Sample method
    const employeeID= Cookies.get('employeeID')

    const payload = {
      employeeID,
      reason: values.reason,
      date: values.date,
      description: values.description,
      isHandled:false,
      message:' ',
    }

    const endpoint = `http://localhost:4444/api/leave/leaves`
    axios
      .post(endpoint, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Leave requested succesfully.',
        })
        navigateBack()
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
      reason: '',
      date: '',
      description: '',
    },
    validationSchema: Yup.object({
      reason: Yup.string().required('Please enter a reason.'),
      date: Yup.date().required('Please enter the date.'),
      description: Yup.string().required('Please enter a description.'),
    }),
    onSubmit: (values) => handleFormSubmit(values),
  })

  const navigateBack = () => {
    window.location.href = '/leave-manager/empDashboard' // Change the URL to navigate
  }

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
            <div className="block my-6 mb-12 p-8">
              <p className="text-3xl font-semibold mb-4">
                Create Leave Request
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
                  {/* <div className="col-6">
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
                  </div> */}

                  <div className="col-6">
                    <div className="form-group">
                      <label
                        htmlFor="reason"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Reason
                      </label>
                      <input
                        type="reason "
                        id="reason"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="..."
                        value={formik.values.reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.errors.reason && formik.touched.reason ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.reason}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  {/* Base Salary Input */}

                  {/* date Input */}
                  <div className="col-6">
                    <div className="date">
                      <label
                        htmlFor="date"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        date:
                      </label>
                      <input
                        id="date"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.errors.date && formik.touched.date ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.date}
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
                        htmlFor="leave-desc"
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
                <div className="row d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
                  >
                    <FontAwesomeIcon
                      className="text-xl mx-4 hover:cursor-pointer"
                      icon={faCheck}
                    />
                    Create Leave
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

export default CreateLeave
