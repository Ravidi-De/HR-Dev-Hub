import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faClipboardUser,
  faComment,
  faFilePdf,
  faHome,
  faLayerGroup,
  faFileContract,
  faRectangleList,
  faGauge,
  faCircleUser,
  faBell,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
  MiniCard,
  Button,
} from '../../../components/common'
import TaskList from '../../../components/it21833366-dimesha/task-list'
import Activity from '../activity/index'
const ActivityMgtDashboard = () => {
  useEffect(() => {
    document.title = 'Activity Management Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/sessions/view',
              name: 'Home',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/sessions/view',
              name: 'Dashboard',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
                  icon={faGauge}
                />
              ),
            },
            {
              path: '/sessions/view',
              name: 'Profile',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
                  icon={faCircleUser}
                />
              ),
            },
            {
              path: '/sessions/create',
              name: 'Activity',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
                  icon={faRectangleList}
                />
              ),
            },
            {
              path: '/training-schedule-mgt/manager/dashboard',
              name: 'Member',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
                  icon={faClipboardUser}
                />
              ),
            },
            {
              path: '/training-scl-activity-mgt/summarysheet',
              name: 'Summary Sheet',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
                  icon={faFileContract}
                />
              ),
            },
            {
              path: '/logout',
              name: 'Logout',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-xl text-gray-400"
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
            <p className="text-3xl">Training School Instructor Dashboard</p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Activity"
              subtitle="Manage activity"
              link="/training-scl-activity-mgt/activity"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faLayerGroup}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Member"
              subtitle="Manage member"
              link='/training-scl-activity-mgt/member'
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faFilePdf}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Summary Sheet"
              subtitle=""
              link="/training-scl-activity-mgt/summarysheet"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faFilePdf}
                />
              }
            ></MiniCard>
          </div>
          <div className='flex mt-10 min-w-0 gap-x-4'>
            <p className="text-2xl">Notification</p>
            <FontAwesomeIcon
              className="text-[#A4161A] text-3xl"
              icon={faBell}
            />
          </div>

          <div class="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow mt-5 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHelperButton">
              <li>
                <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div class="flex items-center h-5">
                    <input id="helper-checkbox-1" aria-describedby="helper-checkbox-text-1" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  </div>
                  <div class="ml-2 text-sm">
                    <label for="helper-checkbox-1" class="font-medium text-gray-900 dark:text-gray-300">
                      <div>Enable notifications</div>
                      <p id="helper-checkbox-text-1" class="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p>
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div class="flex items-center h-5">
                    <input id="helper-checkbox-2" aria-describedby="helper-checkbox-text-2" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  </div>
                  <div class="ml-2 text-sm">
                    <label for="helper-checkbox-2" class="font-medium text-gray-900 dark:text-gray-300">
                      <div>Enable 2FA auth</div>
                      <p id="helper-checkbox-text-2" class="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p>
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div class="flex items-center h-5">
                    <input id="helper-checkbox-3" aria-describedby="helper-checkbox-text-3" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  </div>
                  <div class="ml-2 text-sm">
                    <label for="helper-checkbox-3" class="font-medium text-gray-900 dark:text-gray-300">
                      <div>Subscribe newsletter</div>
                      <p id="helper-checkbox-text-3" class="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p>
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="info-sidebar col-span-1 bg-[#FAFAFA] min-h-screen px-6 pt-6">
          <div className="block my-6">
            <div className='flex min-w-0 gap-x-4'>
              <p className="text-xl text-[#161a1d] font-bold mb-4">
                Daily Task
              </p>
              <Button type='submit' className='h-7 text-lg bg-gray-300 hover:bg-gray-400 text-gray-800 text-white font-bold px-2 rounded-full items-center' children='+'></Button>

            </div>
            <TaskList taskList={[
              { name: 'Lindsay Walton', email: 'lindsay.walton@example.com' },
              { name: 'Lindsay Walton', email: 'lindsay.walton@example.com' },
              { name: 'Lindsay Walton', email: 'lindsay.walton@example.com' }

            ]}></TaskList>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default ActivityMgtDashboard
