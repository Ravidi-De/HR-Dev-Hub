import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCheck,
  faCircleExclamation,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import Swal from 'sweetalert2'

const TmReqForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.title = 'TM Request Form'
  }, [])

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      employeeID: values.employeeID, // Update with the appropriate field name
      NameInFull: values.NameInFull,
      TrainingInstructorApproval: values.TrainingInstructorApproval,
      ApprovalOfQE: values.ApprovalOfQE,
      Date: new Date(values.Date).toISOString(), // Convert date to ISO 8601 format
      Skills: values.Skills,
      Description: values.Description,
    }

    axiosInstance
      .post('/ipm/create', payload) // Replace '/your-api-endpoint' with the actual API endpoint
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Submitted successfully.',
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
      NameInFull: '',
      TrainingInstructorApproval: false,
      ApprovalOfQE: false,
      Date: '', // Use a date string in ISO 8601 format (e.g., "2023-10-01T10:00:00.000Z")
      // Skills: [
      //   {
      //     Skill: '',
      //     TransferLine: '',
      //   },
      // ],
      Description: '',
    },
    validationSchema: Yup.object({
      employeeID: Yup.string().required('Please enter an employee ID.'), // Update with the appropriate validation rule
      NameInFull: Yup.string().required('Please enter a name.'),
      TrainingInstructorApproval: Yup.boolean(),
      ApprovalOfQE: Yup.boolean(),
      Date: Yup.date().required('Please select a date.'),
      // Skill: Yup.string().required('Please enter a skill.'),
      Description: Yup.string().required('Please enter a description.'),
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
                      icon={faUserGroup}
                    />
                  ),
                },
                {
                  path: '/',
                  name: 'View Skill Index',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
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
              Team Memeber Request Form
            </p>
            <p className="text-xl">
              Transferring of operators from training line to main lines.
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
                    Name In Full:
                  </label>
                  <input
                    type="text"
                    id="NameInFull"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.NameInFull}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.NameInFull && formik.touched.NameInFull ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.NameInFull}
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
                    Approval of QE:
                  </label>

                  <select
                    id="ApprovalOfQE"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.ApprovalOfQE}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>

                  {formik.errors.ApprovalOfQE && formik.touched.ApprovalOfQE ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.sessionName}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session name End */}

                {/* Session name */}
                <div className="mb-8">
                  <label
                    htmlFor="TrainingInstructorApproval"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Training Instructor Approval:
                  </label>

                  <select
                    id="TrainingInstructorApproval"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.TrainingInstructorApproval}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>

                  {formik.errors.TrainingInstructorApproval &&
                  formik.touched.TrainingInstructorApproval ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.TrainingInstructorApproval}
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
                Description:
              </label>
              <textarea
                id="Description"
                rows="4"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.Description && formik.touched.Description ? (
                <div className="error text-red-400 p-4 text-lg">
                  <FontAwesomeIcon
                    className="mr-4 text-2xl"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.Description}
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

export default TmReqForm
