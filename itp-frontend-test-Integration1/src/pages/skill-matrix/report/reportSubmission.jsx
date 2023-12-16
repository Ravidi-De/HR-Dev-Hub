import { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faComment,

  faHome,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Dashboard, Loader, Toast,

} from '../../../components/common'

import { Upload } from '../../../components/IT21833298'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { axiosInstance } from '../../../config'
import Swal from 'sweetalert2'

const SkillMatrixReportSubmission = () => {
  useEffect(() => {
    document.title = 'Skill Matrix Manager Report Submission'
  }, [])

  const [isLoading, setIsLoading] = useState(false)


  const handleFormSubmit = (values) => {
    setIsLoading(true)

    const payload = {
      Traineeid: values.Traineeid,
      TraineName: values.TraineName,
      birthday: values.birthday,
      description: values.description,


    }

    axiosInstance
      .post('/sms/project/submit', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Survey created successfully.',
        })
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
      .finally(()  => {
        setIsLoading(false)
        formik.resetForm()
      })
  }

  
  const formik = useFormik({
    
    initialValues: {
      Traineeid: '',
      TraineName: '',
      birthday: '',
      description: '',
     
    },
    validationSchema: Yup.object({
      
      Traineeid: Yup.string().required('Please enter a Trainee id.'),
      TraineName: Yup.string().required('Enter tainee name.'),
      birthday: Yup.string().required('Please enter Trainee birthday.'),
      description: Yup.string().required('Please enter Trainee discription.'),
    }),
    onSubmit: (values) => handleFormSubmit(values),
  })



  return (
    <>
    {isLoading? (
      <Loader/>
    ):(
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
        <p className="text-3xl font-semibold mb-2">Report Submission</p>
        </div>
      

      <form action="" className="my-3 m-1 p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="col lg:mr-4">


        
            {/* File Upload: */}
            <div className="mb-8">
                <label
                    htmlFor="fileUpoad"
                    className="block mb-2 text-xl font-medium text-gray-900"
                >
                    File Upload:
                </label>
                <Upload/>
            </div>
            {/* File Upload: End */}
           </div>

        </div>
      </form>
    </Dashboard>
    )
}
    </>
  )
}

export default SkillMatrixReportSubmission
