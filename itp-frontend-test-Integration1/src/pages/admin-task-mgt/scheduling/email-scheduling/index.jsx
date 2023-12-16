import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCheck,
  faCircleExclamation,
  faClipboardUser,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import internEmails from '../../../training-schedule-mgt/admin/create-session/mock/internEmails.json'
import Swal from 'sweetalert2'

const EmailScheduler = () => {
  useEffect(() => {
    document.title = 'Schedule an email'
  }, [])

  const [selectedInternEmails, setSelectedInternEmails] = useState([])
  const [isLoading, setIsLoading] = useState(false)

    // Func: Add or remove intern emails
    const internEmailSelector = (email, option) => {
      // Add to selected intern emails
      if (option == 'add') {
        if (selectedInternEmails.includes(email)) {
          return Toast(`Email ${email} is already selected.`, 'error', {})
        }
        setSelectedInternEmails([...selectedInternEmails, email])
        return
      }
  
      // Remove from intern emails
      setSelectedInternEmails(
        selectedInternEmails.filter((item) => item !== email)
      )
    }
  

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      sessionOrganizer: values.sessionOrganizer,
      position: values.position,
      participantEmails: selectedInternEmails.map((email) => {
        return {
          email
        }
      }),
      department: values.department,
      message: values.message,
    }

    console.log(payload)

    axiosInstance
      .post('/atm/email/schedule', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email sent successfully.',
        })
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
      .finally(() => {
        setIsLoading(false)
        formik.resetForm()
      })
  }

  // Func: Formik definition
  const formik = useFormik({
    initialValues: {
      sessionOrganizer: '',
    },
    validationSchema: Yup.object({
      sessionOrganizer: Yup.string()
      .email('Enter a valid email address.')
      .required('Enter organizer employee email.'),
      message: Yup.string().required('Enter message body for your email.'),
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
              section: 'Options',
              children: [
                {
                  path: '/admin-task-mgt/dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/greetings',
                  name: 'Greetings',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/content-space',
                  name: 'Content Space',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faClipboardUser}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/scheduler',
                  name: 'Scheduling',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                // {
                //   path: '/admin-task-mgt/reports',
                //   name: 'Reports',
                //   icon: () => (
                //     <FontAwesomeIcon
                //       className="mr-4 text-3xl text-gray-300"
                //       icon={faHome}
                //     />
                //   ),
                // },
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
          <div className="block mt-6 p-8">
            <p className="text-3xl font-semibold mb-4">Email Scheduling:</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-8">
            <div className="col lg:mr-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {/* Select Interns */}
                <div className="mb-8">
                  <label
                    htmlFor="session-name"
                    className="block mb-4 text-xl font-medium text-gray-900"
                  >
                    Select Interns:
                  </label>
                  <select
                    id="countries"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 mb-16"
                    onChange={(e) => internEmailSelector(e.target.value, 'add')}
                  >
                    {internEmails.map((item, index) => (
                      <option key={index} value={item.email}>
                        {item.email}
                      </option>
                    ))}
                  </select>

                  <div className="flex flex-wrap w-full p-4 min-h-[7rem] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500">
                    {internEmails.length === 0 ? (
                      <span className="text-gray-500">
                        Paticipating interns...
                      </span>
                    ) : (
                      selectedInternEmails.map((email, index) => (
                        <button
                          key={index}
                          className="block bg-[#6738bf] text-white h-fit mx-2 py-2 px-4 rounded-full mb-4"
                          onClick={() => internEmailSelector(email, 'remove')}
                        >
                          {email}
                        </button>
                      ))
                    )}
                  </div>
                  <p className="text-right text-gray-500 mt-2">
                    List of participants
                  </p>
                </div>
                {/* Session name End */}
              </div>

              <div className="col lg:ml-0">
                {/* Session Organizer (Employee Email): */}
                <div className="mb-8">
                  <label
                    htmlFor="sessionOrganizer"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Session Organizer (Employee Email):
                  </label>
                  <input
                    type="email"
                    id="sessionOrganizer"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.sessionOrganizer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.sessionOrganizer &&
                  formik.touched.sessionOrganizer ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.sessionOrganizer}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session Organizer (Employee ID): End */}
              </div>

              {/* position */}
              <div className="mb-8">
                <label
                  htmlFor="position"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Position:
                </label>
                <input
                  type="text"
                  id="position"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="..."
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.position && formik.touched.position ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.position}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* position End */}

              {/* department */}
              <div className="mb-8">
                <label
                  htmlFor="department"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Department:
                </label>
                <input
                  type="text"
                  id="department"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="..."
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.department && formik.touched.department ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.department}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* position End */}
            </div>

            {/* Session Description: */}
            <div className="mb-8">
              <label
                htmlFor="session-desc"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Message:
              </label>
              <textarea
                id="message"
                rows="4"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.message && formik.touched.message ? (
                <div className="error text-red-400 p-4 text-lg">
                  <FontAwesomeIcon
                    className="mr-4 text-2xl"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.message}
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
              Schedule Email
            </Button>
          </form>
          <br />
          <br />
        </Dashboard>
      )}
    </>
  )
}

export default EmailScheduler
