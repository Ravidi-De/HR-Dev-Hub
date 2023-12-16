import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressBook,
  faArrowRightFromBracket,
  faCheck,
  faCircleExclamation,
  faMagnifyingGlass,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Dashboard, Loader, Toast } from '../../../../components/common'
import internEmails from './mock/internEmails.json'
import { axiosInstance } from '../../../../config'
import Swal from 'sweetalert2'

const QECreateExam = () => {
  useEffect(() => {
    document.title = 'Create a Session'
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
      ExamType: values.examType,
      InvigilatorEmpID: values.invigilatorId,
      Location: values.examLocation,
      Materials: values.examMaterials,
      Questions: values.examDesc,
      StartTimestamp: new Date(
        `${values.examDate} ${values.examStartTime}`
      ).getTime(),
      EndTimestamp: new Date(
        `${values.examDate} ${values.examEndTime}`
      ).getTime(),
      participantEmails: selectedInternEmails.map((email) => {
        return {
          email,
          score: 0,
          results: {
            pass: false,
            fail: false,
          },
        }
      }),
    }

    axiosInstance
      .post('/ipm/exam', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Exam created successfully.',
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
      examType: '',
      invigilatorId: '',
      examDate: '',
      examStartTime: '09:00',
      examEndTime: '09:00',
      examLocation: 'Exam Hall 1"',
      examMaterials: '',
      examDesc: '',
    },
    validationSchema: Yup.object({
      examType: Yup.string().required('Please enter a session name.'),
      invigilatorId: Yup.string().required('Enter employee id.'),
      examDate: Yup.date()
        .min(today, 'Date cannot be a past date.')
        .required('Select a date for the appointment.'),
      examMaterials: Yup.string().required('Please enter a materials.'),
      examDesc: Yup.string().required('Please enter a description.'),
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
                  path: '/inline-product-mgt/QE/create-exam',
                  name: 'Create Exam Paper',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faAddressBook}
                    />
                  ),
                },
                {
                  path: '/inline-product-mgt/QE/evaluate',
                  name: 'Evaluate Exam Papers',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faMagnifyingGlass}
                    />
                  ),
                },
                {
                  path: '/inline-product-mgt/QE/Dashboard',
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
              Create Final Examination Paper
            </p>
            <p className="text-xl">Use this interface to schedule a session.</p>
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
                    Exam Type:
                  </label>
                  <input
                    type="text"
                    id="examType"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.examType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.examType && formik.touched.examType ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.examType}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session name End */}

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="col">
                    {/* Session Start Time */}
                    <div className="mb-8 lg:mr-4">
                      <label
                        htmlFor="session-start-time"
                        className="block mb-2 text-xl font-medium text-gray-900"
                      >
                        Start Time:
                      </label>
                      <select
                        id="examStartTime"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        value={formik.values.examStartTime}
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
                      {formik.errors.examStartTime &&
                      formik.touched.examStartTime ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.examStartTime}
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
                        End Time:
                      </label>
                      <select
                        id="examEndTime"
                        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                        value={formik.values.examEndTime}
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

                      {formik.errors.examEndTime &&
                      formik.touched.examEndTime ? (
                        <div className="error text-red-400 p-4 text-lg">
                          <FontAwesomeIcon
                            className="mr-4 text-2xl"
                            icon={faCircleExclamation}
                          />
                          {formik.errors.examEndTime}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* Session End Time End */}
                  </div>
                </div>

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

              <div className="col lg:ml-4">
                {/* Session Organizer (Employee Email): */}
                <div className="mb-8">
                  <label
                    htmlFor="sessionOrganizer"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Exam Invigilator (Invigilator ID):
                  </label>
                  <input
                    type="text"
                    id="invigilatorId"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.invigilatorId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.invigilatorId &&
                  formik.touched.invigilatorId ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.invigilatorId}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Session Organizer (Employee ID): End */}

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
                    id="examDate"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    value={formik.values.examDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.examDate && formik.touched.examDate ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.examDate}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Select Date End */}

                {/* Location */}
                <div className="mb-8">
                  <label
                    htmlFor="sessionLocation"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Location:
                  </label>
                  <select
                    id="examLocation"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 mb-4"
                    value={formik.values.examLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Exam Hall 1">Exam Hall 1</option>
                    <option value="Exam Hall 2">Exam Hall 2</option>
                    <option value="Exam Hall 3">Exam Hall 3</option>
                  </select>

                  {formik.errors.examLocation && formik.touched.examLocation ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.examLocation}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Location End */}

                {/* Materials */}
                <div className="mb-8">
                  <label
                    htmlFor="session-desc"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Materials:
                  </label>
                  <textarea
                    id="examMaterials"
                    rows="4"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any specific materials or resources required for the session, such as presentation slides, documents, or tools."
                    value={formik.values.examMaterials}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.examMaterials &&
                  formik.touched.examMaterials ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.examMaterials}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Materials: End */}
              </div>
            </div>

            {/* Session Description: */}
            <div className="mb-8">
              <label
                htmlFor="session-desc"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Add Questions:
              </label>
              <textarea
                id="examDesc"
                rows="4"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={formik.values.examDesc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.examDesc && formik.touched.examDesc ? (
                <div className="error text-red-400 p-4 text-lg">
                  <FontAwesomeIcon
                    className="mr-4 text-2xl"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.examDesc}
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
              Create Exam
            </Button>
          </form>
        </Dashboard>
      )}
    </>
  )
}

export default QECreateExam
