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

const Scheduler = () => {
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
            <p className="text-3xl">Scheduling</p>
          </div>

          <div className="flex flex-wrap mt-14">
            <section className="bg-white">
              <p className="text-2xl leading-10 mb-8">
                Please select the type of scheduling you want to perform.
              </p>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6">
                  <Link to="/admin-task-mgt/scheduler/session-scheduler">
                    <div className="bg-white border-2 border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg p-4">
                      <div className="flex items-center justify-center mb-4">
                        <img
                          className="w-full h-96 object-cover rounded-lg"
                          src="https://source.unsplash.com/SHDCQ1l2WD0/1920x1080"
                          alt="Card Image"
                        />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">
                        Employee well being session
                      </h2>
                      <p className="text-gray-700">
                        Get the stress out from your employees. Schedule a
                        session from here.
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-span-6">
                  <Link to="/admin-task-mgt/scheduler/email-scheduler">
                    <div className="bg-white border-2 border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg p-4">
                      <div className="flex items-center justify-center mb-4">
                        <img
                          className="w-full h-96 object-cover rounded-lg"
                          src="https://static.vecteezy.com/system/resources/previews/008/715/514/original/wallpaper-with-blue-button-sending-email-concept-3d-background-with-copy-space-vector.jpg"
                          alt="Card Image"
                        />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">
                        Schedule Email
                      </h2>
                      <p className="text-gray-700">
                        Send a greeting email to all new employees to warmly
                        welcome to the organization.
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-span-12">
                  <Link to="/admin-task-mgt/scheduler/view-session">
                    <div className="bg-slate-200 border-2 border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg p-4">
                      <h2 className="text-2xl font-semibold mb-2">
                        View Employee Well-being Sessions
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Scheduler
