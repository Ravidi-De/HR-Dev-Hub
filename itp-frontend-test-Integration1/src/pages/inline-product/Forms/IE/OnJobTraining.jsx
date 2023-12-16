import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAdd,
  faArrowRightFromBracket,
  faCheck,
  faCircleExclamation,
  faNewspaper,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import Swal from 'sweetalert2'

const OnJobTraining = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.title = 'TM Request Form'
  }, [])

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      employeeID: values.employeeID, // Update with the appropriate field name
      OperatorName: values.OperatorName,
      SMV: values.SMV,
      Operation: values.Operation,
      Date: new Date(values.Date).toISOString(), // Convert date to ISO 8601 format
      Name: values.Name,
      Remarks: values.Remarks,
    }

    axiosInstance
      .post('/ipm/create', payload) // Replace '/your-api-endpoint' with the actual API endpoint
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Updated successfully.',
        })
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          return Toast('Cannot connect with the backend API.', 'error', {})
        }
        Toast(error.response.data, 'error', {})
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const formik = useFormik({
    initialValues: {
      employeeID: '', // Update with the appropriate field name
      Name: '',
      SMV: '',
      OperatorName: '',
      Operation: '',
      Date: '',
      Remarks: '',
    },
    validationSchema: Yup.object({
      employeeID: Yup.string().required('Please enter an employee ID.'), // Update with the appropriate validation rule
      SMV: Yup.string().required('Please enter a valid SMV.'),
      Operation: Yup.string().required('Please enter a operation Name'),
      OperatorName: Yup.string().required('Please enter a operator Name'),
      Date: Yup.date().required('Please select a date.'),
      // Skill: Yup.string().required('Please enter a skill.'),
      Remarks: Yup.string().required('Please enter a description.'),
    }),
    onSubmit: (values) => handleFormSubmit(values),
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Dashboard
          sectionLinks={[
            {
              section: 'Option',
              children: [
                {
                  path: '/inline-product-mgt/IE/OnJobTraining',
                  name: 'On Job Training',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faNewspaper}
                    />
                  ),
                },
                {
                  path: '/inline-product-mgt/IE/TMReq',
                  name: 'TM Request Form',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faAdd}
                    />
                  ),
                },
              ],
            },
            {
              section: 'Other Options',
              children: [
                {
                  path: '/inline-product-mgt/IE/Dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
                    />
                  ),
                },
                {
                  path: '/logout',
                  name: 'Logout',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faArrowRightFromBracket}
                    />
                  ),
                },
              ],
            },
          ]}
        >
          <div className="block my-6 mb-12 p-8">
            <p className="text-3xl font-semibold mb-4">
              On The Job Training Follow Up Sheet
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="my-8 px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div className="col lg:mr-4">
                {/* Session name */}
                <div className="mb-8">
                  <label
                    htmlFor="session-name"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Operation:
                  </label>
                  <input
                    type="text"
                    id="Operation"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the Operation Name"
                    value={formik.values.Operation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.Operation && formik.touched.Operation ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.Operation}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session name End */}

                {/* Session name */}
                <div className="mb-8">
                  <label
                    htmlFor="smv"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    SMV:
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="SMV"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the SMV"
                    value={formik.values.SMV}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.SMV && formik.touched.SMV ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.SMV}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session name End */}

                {/* Session name */}
                <div className="mb-8">
                  <label
                    htmlFor="session-name"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Operator Name:
                  </label>
                  <input
                    type="text"
                    id="OperatorName"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the Operator Name"
                    value={formik.values.OperatorName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.OperatorName && formik.touched.OperatorName ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.OperatorName}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session name End */}
              </div>

              <div className="col lg:ml-4">
                {/* Session Organizer (Employee Email): */}
                <div className="mb-8">
                  <label
                    htmlFor="employeeID"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Employee ID:
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
                {/* Session Organizer (Employee ID): End */}

                {/* Select Date */}
                <div className="mb-8">
                  <label
                    htmlFor="Date"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Select Date:
                  </label>
                  <input
                    type="date"
                    id="Date"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.Date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.Date && formik.touched.Date ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.Date}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Select Date End */}

                {/* Location */}
                {/* <div className="mb-8">
                  <label
                    htmlFor="sessionLocation"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Select Skills:
                  </label>
                  <select
                    id="sessionLocation"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 mb-4"
                    value={formik.values.sessionLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Skill 1">Skill 1</option>
                    <option value="Skill 2">Skill 2</option>
                  </select>

                  <label
                    htmlFor="sessionLocation"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Transfer Line:
                  </label>
                  <select
                    id="sessionLocation"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 mb-4"
                    value={formik.values.sessionLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Line 1">Line 1</option>
                    <option value="Module">Module 2</option>
                  </select>

                  {formik.errors.sessionLocation &&
                  formik.touched.sessionLocation ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.sessionLocation}
                    </div>
                  ) : (
                    ''
                  )}
                </div> */}
                {/* Location End */}
              </div>
            </div>

            {/* Session Description: */}
            <div className="mb-8">
              <label
                htmlFor="Description"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Remarks:
              </label>
              <textarea
                id="Remarks"
                rows="4"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={formik.values.Remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.Remarks && formik.touched.Remarks ? (
                <div className="error text-red-400 p-4 text-lg">
                  <FontAwesomeIcon
                    className="mr-4 text-2xl"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.Remarks}
                </div>
              ) : (
                ''
              )}
            </div>
            {/* Session Description: End */}

            <Button
              type="submit"
              className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
            >
              <FontAwesomeIcon
                className="text-xl mx-4 hover:cursor-pointer"
                icon={faCheck}
              />
              Submit
            </Button>
          </form>
        </Dashboard>
      )}
    </>
  )
}

export default OnJobTraining
