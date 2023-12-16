import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faFile,
  faFileAlt,
  faMagnifyingGlass,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Dashboard,
  Greeting,
} from '../../../components/common'
import { DashboardLandingCard2 } from '../../../components/IT21833120'

const PEDashboard = () => {
  useEffect(() => {
    document.title = 'Production Engineer Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/training-schedule-mgt/sessions/view',
              name: 'View skill index',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMagnifyingGlass}
                />
              ),
            },
            {
              path: '/training-schedule-mgt/admin/sessions/create',
              name: 'Summary Sheet',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faFileAlt}
                />
              ),
            },
          ],
        },
        {
          section: 'Other Options',
          children: [
            {
              path: '/training-schedule-mgt/admin/dashboard',
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
      <div className="block my-6 p-8">
        <p className="text-3xl text-[#FFA14E] font-bold mb-4">
          <Greeting />
        </p>
        <p className="text-3xl">Production Engineer Dashboard</p>
      </div>

      <div className="block mt-24">
        <DashboardLandingCard2
          title="Skill Evaluation"
          description="Follow up employee performance"
          illustration="/static/illustrations/PE dashboard.svg"
          isIllustrationTopEnabled={true}
          linkTitle="Assign a Digital Badge"
          linkLoc="/training-schedule-mgt/admin/sessions/create"
         linkTitle2="Performance Heat Map"
         linkLoc2="/training-schedule-mgt/admin/sessions/create"
        />
   
</div>
      
     
    </Dashboard>
  )
}

export default PEDashboard
