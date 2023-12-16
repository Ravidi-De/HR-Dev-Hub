import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faComment,
  faHome,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
  MiniCard,
} from '../../../../components/common'

const TrainingScheduleMgtManagerDashboard = () => {
  useEffect(() => {
    document.title = 'Training Schedule Management Manager Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/training-schedule-mgt/manager/sessions',
              name: 'View sessions',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faComment}
                />
              ),
            },
            {
              path: '/training-schedule-mgt/manager/dashboard',
              name: 'Dashboard',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
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
            <p className="text-3xl">Training Schedule Manager Dashboard</p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Sessions"
              subtitle="View Sessions"
              link="/training-schedule-mgt/manager/sessions"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faLayerGroup}
                />
              }
            ></MiniCard>
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

export default TrainingScheduleMgtManagerDashboard
