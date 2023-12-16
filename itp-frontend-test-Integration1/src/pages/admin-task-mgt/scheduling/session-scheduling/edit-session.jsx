import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faClipboardUser,
    faComment,
    faHome,
    faCheck,
    faCircleExclamation
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { time24hAdjust } from '../../../../utils/time'

const EditHRSessionPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState([])
  let { id } = useParams()

  useEffect(() => {
    document.title = 'Edit a Session'

    axiosInstance.get(`/atm/hrsession/${id}`).then((res) => {
      let date = new Date(res.data.sessionStartTimestamp)

      // Manipulate feilds
      res.data.sessionDate = `${date.getFullYear()}-${date
        .getMonth()
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

      res.data.sessionStartTime = time24hAdjust(date.getTime())
      res.data.sessionEndTime = time24hAdjust(
        new Date(res.data.sessionEndTimestamp).getTime()
      )
      // Manipulate feilds

      setSessionData(res.data)
    })
  }, [])


  // Func: Handle form submit
  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      sessionName: values.sessionName,
      sessionType: values.sessionType,
      sessionStartTimestamp: new Date(
        `${values.sessionDate} ${values.sessionStartTimestamp}`
      ).getTime(),
      sessionEndTimestamp: new Date(
        `${values.sessionDate} ${values.sessionEndTimestamp}`
      ).getTime(),
      speaker: values.speaker,
    }

    axiosInstance
      .put(`/atm/edithrsession/${id}`, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Session updated successfully.',
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
      sessionName: sessionData.sessionName || '',
      sessionType: sessionData.sessionType || '',
      speaker: sessionData.speaker || '',
      sessionStartTime: sessionData.sessionStartTimestamp || '09:00',
      sessionEndTime: sessionData.sessionEndTimestamp || '09:00',
    },
    validationSchema: Yup.object({
      sessionName: Yup.string().required('Please enter a session name.'),
      sessionDate: Yup.date()
        .min(today, 'Date cannot be a past date.')
        .required('Select a date for the appointment.'),
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
            <p className="text-3xl font-semibold mb-4">
              Edit Session / {sessionData.sessionName}
            </p>
            <p className="text-xl">Use this interface to edit session.</p>
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
                {/* Session name End */}

                <div className="mb-8">
                  <label
                    htmlFor="session-speaker"
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

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="col">
                    {/* Session Start Time */}
                    <div className="mb-8 lg:mr-4">
                      <label
                        htmlFor="session-start-time"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Session Start Time:
                      </label>
                      <select
                        id="sessionStartTime"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        value={formik.values.sessionStartTime}
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
                      {formik.errors.sessionStartTime &&
                      formik.touched.sessionStartTime ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.sessionStartTime}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* Session Start Time End */}
                  </div>
                  <div className="col">
                    {/* Session End Time */}
                    <div className="mb-8 lg:mr-4">
                      <label
                        htmlFor="session-end-time"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Session End Time:
                      </label>
                      <select
                        id="sessionEndTime"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        value={formik.values.sessionEndTime}
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

                      {formik.errors.sessionEndTime &&
                      formik.touched.sessionEndTime ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.sessionEndTime}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* Session End Time End */}
                  </div>
                </div>

            </div>

              <div className="col lg:ml-4">
                <div className="mb-8">
                  <label
                    htmlFor="sessionType"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Session Type:
                  </label>
                  <input
                    type="text"
                    id="sessionType"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.sessionType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.sessionType &&
                  formik.touched.sessioType ? (
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

                {/* Select Date */}
                <div className="mb-8">
                  <label
                    htmlFor="sessionDate"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Select Date:
                  </label>
                  <input
                    type="date"
                    id="sessionDate"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.sessionDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.sessionDate && formik.touched.sessionDate ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.sessionDate}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Select Date End */}
                </div>
            </div>

            <Button
              type="submit"
              className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
            >
              <FontAwesomeIcon
                className="text-xl mx-4 hover:cursor-pointer"
                icon={faCheck}
              />
              Update Session
            </Button>
          </form>
        </Dashboard>
      )}
    </>
  )
}

export default EditHRSessionPage
