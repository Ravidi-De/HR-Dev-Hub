import { useEffect, useState } from 'react'
import Login from '../../../components/common/login'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosInstance } from '../../../config'
import Swal from 'sweetalert2'
import { Toast } from 'react-bootstrap'
import { Loader } from '../../../components/common'

const EditDiary = () => {
  const [isLoading, setIsLoading] = useState(false)
  let { id } = useParams()
  const [todo, setTodo] = useState({})

  useEffect(() => {
    axiosInstance
      .get(`/tds/todo/${id}`)
      .then((res) => {
        setTodo(res.data)
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          return Toast('Cannot connect with the backend API.', 'error', {})
        }
        Toast(error.response.data.data, 'error', {})
      })
  }, [])

  const handleFormSubmit = (values) => {
    // Handle form submission here
    const payload = {
      ...values,
      timestamp: new Date(values.timestamp).getTime(),
      _id: undefined,
    }
    axiosInstance
      .put(`/tds/todo/${id}`, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Todo updated successfully.',
        })
        formik.resetForm()
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
      title: todo.title || '',
      type: todo.type || 'Project',
      timestamp: new Date(todo.timestamp) || today,
      desc: todo.desc || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Please enter a todo name.'),
      timestamp: Yup.date()
        .min(today, 'Date cannot be a past date.')
        .required('Select a date.'),
      desc: Yup.string().required('Please enter a description.'),
    }),
    onSubmit: (values) => handleFormSubmit(values),
    enableReinitialize: true,
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Login
          title="Edit Todo"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
          illustrationUrl="/static/illustrations/Admin-Login.svg"
          quoteText="Forgive yourself for not knowing what you didn’t know before you learned it."
          quoteAuthor="Maya Angelou"
        >
          <div className="w-full max-w-xl mx-auto">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.title && formik.touched.title ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.title}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="Project">Project</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Task">Task</option>
                </select>
                {formik.errors.type && formik.touched.type ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.type}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  id="timestamp"
                  value={formik.values.timestamp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.timestamp && formik.touched.timestamp ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.timestamp}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Description"
                  id="desc"
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.desc && formik.touched.desc ? (
                  <div className="error text-red-400 p-4 text-lg">
                    <FontAwesomeIcon
                      className="mr-4 text-2xl"
                      icon={faCircleExclamation}
                    />
                    {formik.errors.desc}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>

              <p className="text-center text-xl">
                <Link to="/trainee-diary/dashboard">&#x3C; Back</Link>
              </p>
            </form>
          </div>
        </Login>
      )}
    </>
  )
}

export default EditDiary
