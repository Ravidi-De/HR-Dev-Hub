import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faClipboardUser,
    faComment,
    faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import { useParams } from 'react-router-dom'
import { timeAdjust } from '../../../../utils/time'

const HRViewSessionPage = () => {
  let { id } = useParams()
  const [sessionData, setSessionData] = useState({})

  useEffect(() => {
    document.title = 'Training Schedule Management Admin Dashboard'

    axiosInstance.get(`atm/hrsession/${id}`).then((res) => {
      setSessionData(res.data)
    })
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
      <div className="block mt-6 p-8">
        <p className="text-3xl">Session &#x3E; {sessionData.sessionName}</p>
      </div>

      <div className="block p-8">
        <p className="mb-4">
          <span className="font-semibold">Session ID:</span> {sessionData._id}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Session Name:</span>{' '}
          {sessionData.sessionName}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Session Type:</span>{' '}
          {sessionData.sessionType}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Date:</span>{' '}
          {new Date(sessionData.sessionStartTimestamp).toDateString()}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Start Time:</span>{' '}
          {timeAdjust(sessionData.sessionStartTimestamp)}
        </p>
        <p className="mb-6">
          <span className="font-semibold">End Time:</span>{' '}
          {timeAdjust(sessionData.sessionEndTimestamp)}
        </p>
      </div>
    </Dashboard>
  )
}

export default HRViewSessionPage