import { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faComment,

  faHome,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Dashboard,

} from '../../../components/common'

import { axiosInstance } from '../../../config'
import { useParams } from 'react-router-dom'



const SkillMatrixInternFeedback = () => {

  let { id } = useParams()
  const [sessionData, setSessionData] = useState({})


  useEffect(() => {
    document.title = 'Skill Matrix Intern Feedback'

    axiosInstance.get(`/tsms/session/${id}`).then((res) => {
      setSessionData(res.data)
      console.log(sessionData)
    })
  }, [])



  return (
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
        <p className="text-3xl font-semibold mb-2">Feedback Submission</p>
        </div>
        
    
     

      <form action="" className="my-3 m-1 p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2">
          <div className="col lg:mr-4">
        
        
                

          
           </div>

        </div>
      </form>
    </Dashboard>
  )
}

export default SkillMatrixInternFeedback
