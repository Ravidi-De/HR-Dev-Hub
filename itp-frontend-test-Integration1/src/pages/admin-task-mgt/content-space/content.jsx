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
import { Button, Dashboard, Loader, Toast } from '../../../components/common'
import { axiosInstance } from '../../../config'
import Swal from 'sweetalert2'

const ContentSpace = () => {
    useEffect (() => {
        document.title = 'Admin Task Management Dashboard'
    }
    )

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (values) => {
        setIsLoading(true)

        const payload = {
          empName: values.empName,
          empQuote: values.empQuote,
        }

    axiosInstance
    .post('/atm/content', payload)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Content created successfully.',
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
      empName: '',
      empQuote: '',
    },
    validationSchema: Yup.object({
      empName: Yup.string().required('Please enter a name.'),
      empQuote: Yup.string().required('Please enter a quote.'),
    }),
    onSubmit: (values) => handleSubmit(values),
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
                        )
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
                    //     path: '/admin-task-mgt/reports',
                    //     name: 'Reports',
                    //     icon: () => (
                    //       <FontAwesomeIcon
                    //         className="mr-4 text-3xl text-gray-300"
                    //         icon={faHome}
                    //       />
                    //     ),
                    //   },
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
                ]
            }
            ]}
        >
            <div className="block my-12 mt-16">
              <p className="text-3xl ml-12">Add Quotes</p>
            </div>
            <form onSubmit={formik.handleSubmit} className="my-8 px-8">
                <div className="col lg:mr-4 ml-4">
                    <div className="mb-8">
                        <label 
                          htmlFor="empName" 
                          className="block mb-2 mt-6 text-xl font-medium text-gray-900"
                        >
                          Employee Name: 
                        </label>
                        <input 
                            type="text" 
                            id="empName"
                            className="block w-full mt-6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name..."
                            value={formik.values.empName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.empName && formik.touched.empName ? (
                            <div className="error text-red-400 p-4 text-lg">
                                <FontAwesomeIcon
                                    className="mr-4 text-2xl"
                                    icon={faCircleExclamation}
                                />
                                {formik.errors.empName}
                            </div>
                        ) : (
                            ''
                        )}
                        <label
                          htmlFor="quote"
                          className="block mb-2 mt-6 text-xl font-medium text-gray-900 "
                        >
                          Quote:
                        </label>
                        <input 
                          type="textarea"
                          id="empQuote"
                          className="block mb-6 mt-6 w-full p-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter a quote... "
                          value={formik.values.empQuote}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <Button
                          type="submit"
                          className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72"
                        >
                          <FontAwesomeIcon
                            className="text-xl mx-4 hover:cursor-pointer"
                            icon={faCheck}
                          />
                          Add Content
                        </Button>
                    </div>
                </div>
            </form>
        </Dashboard>
        )}
        </>
    )
}

export default ContentSpace