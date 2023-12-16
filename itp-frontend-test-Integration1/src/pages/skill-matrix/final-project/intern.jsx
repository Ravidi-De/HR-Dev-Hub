import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCircleExclamation,
  faComment,
  faHome,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Loader, Toast } from '../../../components/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { axiosInstance } from '../../../config'
import Swal from 'sweetalert2'

const SkillMatrixInternProject = () => {
  useEffect(() => {
    document.title = 'Skill Matrix Intern Project'
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    formik.setFieldValue('file', selectedFile)
  }

  const handleFormSubmit = async (values) => {
    setIsLoading(true)

    const payload = {
      TraineeID: values.TraineeID,
      TraineeName: values.TraineeName,
      birthday: values.birthday,
      description: values.description,
      file: values.file,
    }

    try {
      const formData = new FormData()
      formData.append('TraineeID', payload.TraineeID)
      formData.append('TraineeName', payload.TraineeName)
      formData.append('birthday', payload.birthday)
      formData.append('description', payload.description)
      formData.append('file', payload.file)

      const response = await axiosInstance.post(
        '/sms/project/submit',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Project uploaded successfully.',
        })
      } else {
        alert('File upload failed!')
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        Toast('Cannot connect with the backend API.', 'error', {})
      } else {
        Toast(error.response.data.data, 'error', {})
      }
    } finally {
      setIsLoading(false)
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: {
      TraineeID: '',
      TraineeName: '',
      birthday: '',
      description: '',
      file: null,
    },
    validationSchema: Yup.object({
      TraineeID: Yup.string().required('Please enter a Trainee id.'),
      TraineeName: Yup.string().required('Enter trainee name.'),
      birthday: Yup.string().required('Please enter Trainee birthday.'),
      description: Yup.string().required('Please enter Trainee description.'),
      file: Yup.mixed().required('Please select a file.'),
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
                  path: '/skill-matrix/intern/dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                {
                  path: '#',
                  name: 'My Profile',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
                    />
                  ),
                },
                {
                  path: '#',
                  name: 'FeedBack',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
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
          <div className="block my-6 mb-5 p-8">
            <p className="text-3xl font-semibold mb-2">Project Submission</p>
          </div>
          <div className=" p-8">
            <p className="text-lg font-semibold mb-2">
              The trainee's final project is not only a vital assessment of
              their current skills but also a crucial stepping stone that will
              undeniably shape their future.
            </p>
            <br />
            <br />
            <br />
            <p className="text-2xl font-semibold mb-2">File Upload Input</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="my-3 m-1 p-8">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div className="col lg:mr-4">
                <div className="mb-8">
                  <label
                    htmlFor="trainee-name"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Trainee Name:
                  </label>
                  <input
                    type="text"
                    id="TraineeName"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    required
                    value={formik.values.TraineeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.TraineeName && formik.touched.TraineeName ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.TraineeName}
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="TraineeID"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Trainee Id:
                  </label>
                  <input
                    type="text"
                    id="TraineeID"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    required
                    value={formik.values.TraineeID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.errors.TraineeID && formik.touched.TraineeID ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.TraineeID}
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    required
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.birthday && formik.touched.birthday ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.birthday}
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    required
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.errors.description && formik.touched.description ? (
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

                <div className="mb-8">
                  <label
                    htmlFor="fileUpload"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    File Upload:
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-5 block w-full p-3 rounded-md border border-gray-300 focus:border-[#A4161A]"
                  />
                  {formik.errors.file && formik.touched.file ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.file}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="m-auto">
              <button
                type="submit"
                className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto mb-8"
              >
                Submit
              </button>
            </div>
          </form>
        </Dashboard>
      )}
    </>
  )
}

export default SkillMatrixInternProject
