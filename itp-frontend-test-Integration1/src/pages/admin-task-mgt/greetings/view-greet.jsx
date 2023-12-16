import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCheck,
  faCircleExclamation,
  faClipboardUser,
  faComment,
  faHome,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../components/common'
import { axiosInstance } from '../../../config'
import Swal from 'sweetalert2'

const ViewGreet = () => {
  useEffect(() => {
    document.title = 'Edit Greet'
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState({
    name: 'Test',
    position: '',
    department: '',
    message: '',
  })

  let { id } = useParams()
  const navigate = useNavigate()

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      name: values.name,
      position: values.position,
      department: values.department,
      message: values.message,
    }

    axiosInstance
      .put(`/atm/greetings/${id}`, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Greet updated successfully.',
        })
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
      .finally(() => {
        setIsLoading(false)
        setSessionData(payload)
      })
  }

  // Func: Handle delete
  const handleDelete = () => {
    setIsLoading(true)
    axiosInstance
      .delete(`/atm/greetings/${id}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Greet deleted successfully.',
        }).then(() => {
          navigate('/admin-task-mgt/greetings/view/')
        })
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

  // Func: Get data
  useEffect(() => {
    document.title = 'Admin Task Management - View greeting'
    setIsLoading(true)
    axiosInstance.get(`/atm/greetings/${id}`).then((res) => {
      setSessionData(res.data)
      setIsLoading(false)
    })
  }, [])

  // Func: Formik definition
  const formik = useFormik({
    initialValues: {
      name: sessionData.name,
      position: sessionData.position,
      department: sessionData.department,
      message: sessionData.message,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter a name.'),
      position: Yup.string().required('Enter position'),
      department: Yup.string().required(),
      message: Yup.string().required(),
    }),
    onSubmit: (values) => handleFormSubmit(values),
    enableReinitialize: true,
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
          <div className="block my-6 mb-12 p-8">
            <p className="text-3xl text-center font-semibold mb-4">
              Greeting by{' '}
              <span className="text-red-400">{sessionData.name}</span>
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="my-8 px-8">
            <div className="col lg:mr-4">
              {/* Name */}
              <div className="mb-8">
                <label
                  htmlFor="name"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="..."
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.name}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* Name End */}

              {/* Position */}
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
                  name="position"
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
              {/* Position End */}
              {/* Department */}
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
              {/* Department End */}
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
              Update Greet
            </Button>
            <button
              type="submit"
              className="ml-8 text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
              onClick={handleDelete}
            >
              <FontAwesomeIcon
                className="text-xl mx-4 hover:cursor-pointer"
                icon={faTimes}
              />
              Delete Greet
            </button>
          </form>
        </Dashboard>
      )}
    </>
  )
}

export default ViewGreet
