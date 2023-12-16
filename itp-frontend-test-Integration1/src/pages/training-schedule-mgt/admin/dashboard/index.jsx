import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Dashboard,
  DashboardLandingCard,
  Greeting,
} from '../../../../components/common'

const TrainingScheduleMgtAdminDashboard = () => {
  useEffect(() => {
    document.title = 'Training Schedule Management Admin Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Sessions',
          children: [
            {
              path: '/training-schedule-mgt/admin/sessions',
              name: 'View all sessions',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faUserGroup}
                />
              ),
            },
            {
              path: '/training-schedule-mgt/admin/sessions/create',
              name: 'Create session',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faUserGroup}
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
        <p className="text-3xl">Training Schedule Admin Dashboard</p>
      </div>

      <div className="block mt-24">
        <DashboardLandingCard
          title="Schedule a session"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          illustration="/static/illustrations/Session.svg"
          isIllustrationTopEnabled={true}
          linkTitle="Create Session"
          linkLoc="/training-schedule-mgt/admin/sessions/create"
        />
      </div>
    </Dashboard>
  )
}

export default TrainingScheduleMgtAdminDashboard
