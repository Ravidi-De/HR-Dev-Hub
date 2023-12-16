import { useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faComment,

  faHome,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
} from '../../../components/common'
import Card from '../../../components/IT21833298/card'

const SkillMatrixInternDashboard = () => {
  useEffect(() => {
    document.title = 'Skill Matrix Intern Dashboard'
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
      <div className="grid grid-cols-4">
        <div className="content col-span-3 px-12 py-8">
          <div className="block my-6">
            <p className="text-3xl text-[#FFA14E] font-bold mb-4">
              <Greeting />
            </p>
            <p className="text-3xl">Skill Matrix Intern Dashboard</p>
          </div>

          <div className="mt-20">
            <Card    
              title="Final project"
              subtitle="View Congratulations on completing your enriching 6-month training journey! As you prepare to submit your final project, remember that this isn't just a document – it's a reflection of your growth, dedication, and the skills you've honed."
              link="/skill-matrix/Intern/project"
              buttonText="Submission"
            />
          </div>
          <div className="mt-20">
            <Card    
              title="Skill Survey"
              subtitle="Embark on a transformative journey of self-discovery with the Skill Survey – a powerful tool that holds the key to unlocking your potential and shaping your future. Your honest self-evaluation within this survey is a crucial step towards your goal of securing a permanent position after your internship."
              link="/skill-matrix/Intern/survey"
              buttonText="Evaluate"
            />
          </div>

        </div>

        <div className="info-sidebar col-span-1 bg-[#FAFAFA] min-h-screen px-6 pt-6">
          <p className="font-bold text-2xl">Calendar</p>
          <Calendar />
        </div>
        
      </div>
    </Dashboard>
  )
}

export default SkillMatrixInternDashboard
