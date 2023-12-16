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
import Swal from 'sweetalert2'

const SessionScheduler = () => {
  useEffect(() => {
    document.title = 'Create a Greet'
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      sessionName: values.sessionName,
      sessionType: values.sessionType,
      sessionStartTimestamp: new Date(
        `${values.startDate} ${values.startTime}`
      ).getTime(),
      sessionEndTimestamp: new Date(
        `${values.endDate} ${values.endTime}`
      ).getTime(),
      speaker: values.speaker,
    }

    axiosInstance
      .post('/atm/session', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Session created successfully.',
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
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const formik = useFormik({
    initialValues: {
      sessionName: '',
      startTime: '09:00',
      sessionType: 'Employee Treatment',
      endTime: '09:00',
      speaker: '',
    },
    validationSchema: Yup.object({
      sessionName: Yup.string().required('Enter session name.'),
      startDate: Yup.date()
        .min(today, 'Date cannot be a past date.')
        .required('Select a date for session.'),
      endDate: Yup.date()
        .min(today, 'Date cannot be a past date.')
        .required('Select a date for session.'),
      speaker: Yup.string().required('Enter speaker name.'),
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
            <p className="text-3xl font-semibold mb-4">Session Scheduling:</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="px-8">
            <div className="col lg:mr-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {/* Session Name */}
                <div className="mb-8">
                  <label
                    htmlFor="sessionName"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Session Name:
                  </label>
                  <input
                    type="text"
                    id="sessionName"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.sessionName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.sessionName && formik.touched.sessionName ? (
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
                {/* TO End */}

                {/* Session Type */}
                <div className="mb-8">
                  <label
                    htmlFor="sessionType"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Session Type:
                  </label>
                  <select
                    id="sessionType"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.sessionType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Employee Treatment">
                      Employee Treatment
                    </option>
                    <option value="Conflict">Conflict</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.errors.sessionType && formik.touched.sessionType ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.startTime}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session Type End */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {/* Start Date */}
                <div className="mb-8">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.startDate && formik.touched.startDate ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.startDate}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Start Date End */}

                {/* End Date */}
                <div className="mb-8">
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.endDate && formik.touched.endDate ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.endDate}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* End Date End */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                {/* Start Time */}
                <div className="mb-8">
                  <label
                    htmlFor="startTime"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Start Time:
                  </label>
                  <select
                    id="startTime"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="09:15">09:15 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="09:45">09:45 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:15">10:15 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="10:45">10:45 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:15">11:15 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="11:45">11:45 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:15">12:15 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="12:45">12:45 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:15">01:15 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="13:45">01:45 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:15">02:15 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="14:45">02:45 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:15">03:15 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="15:45">03:45 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="16:15">04:15 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="16:45">04:45 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="17:15">05:15 PM</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="17:45">05:45 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                  {formik.errors.startTime && formik.touched.startTime ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.startTime}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Start Time End */}

                {/* End Time */}
                <div className="mb-8">
                  <label
                    htmlFor="endTime"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    End Time:
                  </label>
                  <select
                    id="endTime"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="09:15">09:15 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="09:45">09:45 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:15">10:15 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="10:45">10:45 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:15">11:15 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="11:45">11:45 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:15">12:15 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="12:45">12:45 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:15">01:15 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="13:45">01:45 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:15">02:15 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="14:45">02:45 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:15">03:15 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="15:45">03:45 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="16:15">04:15 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="16:45">04:45 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="17:15">05:15 PM</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="17:45">05:45 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                  {formik.errors.time && formik.touched.time ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.time}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* End Time End */}
              </div>

              {/* Speaker */}
              <div className="mb-8">
                <label
                  htmlFor="speaker"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Speaker:
                </label>
                <input
                  type="text"
                  id="speaker"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="..."
                  value={formik.values.speaker}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.speaker && formik.touched.speaker ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.speaker}
                  </div>
                ) : (
                  ''
                )}
              </div>
              {/* Speaker End */}
            </div>

            <Button
              type="submit"
              className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
            >
              <FontAwesomeIcon
                className="text-xl mx-4 hover:cursor-pointer"
                icon={faCheck}
              />
              Schedule Session
            </Button>
          </form>
          <br />
          <br />
        </Dashboard>
      )}
    </>
  )
}

export default SessionScheduler
