import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCalendar,
  faChartColumn,
  faClipboardUser,
  faComment,
  faHandshake,
  faHome,
  faTelevision,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Greeting, MiniCard } from '../../../components/common'

const AdminTaskMgtDashboard = () => {
  useEffect(() => {
    document.title = 'Admin Task Management Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Dashboard',
          children: [
            {
              path: '/admin-task-mgt/dashboard',
              name: 'Dashboard',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faComment}
                />
              ),
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
            //   path: '/admin-task-mgt/reports',
            //   name: 'Reports',
            //   icon: () => (
            //     <FontAwesomeIcon
            //       className="mr-4 text-3xl text-gray-300"
            //       icon={faHome}
            //     />
            //   ),
            // },
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
      <div className="grid">
        <div className="content px-12 py-8">
          <div className="block my-6">
            <p className="text-3xl text-[#FFA14E] font-bold mb-4">
              <Greeting />
            </p>
            <p className="text-3xl">Admin Task Management Dashboard</p>
          </div>

          <div className="flex flex-wrap mt-16">
            <MiniCard
              title="Greetings"
              subtitle=""
              link="/admin-task-mgt/greetings"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faHandshake}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Content Space"
              subtitle=""
              link="/admin-task-mgt/content-space"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faTelevision}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Scheduling"
              subtitle=""
              link="/admin-task-mgt/scheduler"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faCalendar}
                />
              }
            ></MiniCard>
            {/* <MiniCard
              title="Reports"
              subtitle=""
              link="/admin-task-mgt/report"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faChartColumn}
                />
              }
            ></MiniCard> */}
            {/* <MiniCard
              title="Settings"
              subtitle=""
              link="/"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faGears}
                />
              }
            ></MiniCard> */}
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default AdminTaskMgtDashboard
