import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faClipboardUser,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../components/common'
import { Link } from 'react-router-dom'

const AdminTaskMgtGreetingsPage = () => {
  useEffect(() => {
    document.title = 'Admin Task Management Dashboard'
  }, [])

  return (
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
            <p className="text-3xl">Greetings</p>
          </div>

          <div className="flex flex-wrap mt-14">
            <section className="bg-white">
              <p className="text-2xl mb-4">Dear Employees,</p>
              <p className="text-2xl leading-10">
                We appreciate your support in helping us fulfill our goal of
                making a better work environment for all. <br />
                Thank you!
              </p>

              <div className="block mt-12">
                <Link to="/admin-task-mgt/greetings/create">
                  <div
                    className="block mx-auto p-6 mb-8 text-lg border-red-800 border-2 text-red-800 rounded-tl-2xl rounded-br-2xl bg-red-50 w-full lg:w-3/4 hover:scale-105 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                    role="alert"
                  >
                    Submit greeting
                  </div>
                </Link>
                <Link to="/admin-task-mgt/greetings/view">
                  <div
                    className="block mx-auto p-6 mb-8 text-lg border-red-800 border-2 text-red-800 rounded-tl-2xl rounded-br-2xl bg-red-50 w-full lg:w-3/4 hover:scale-105 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                    role="alert"
                  >
                    View Greeting
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default AdminTaskMgtGreetingsPage
