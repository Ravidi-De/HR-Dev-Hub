import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import { useParams } from 'react-router-dom'
import { timeAdjust } from '../../../../utils/time'

const AdminViewSessionPage = () => {
  let { id } = useParams()
  const [sessionData, setSessionData] = useState({})

  useEffect(() => {
    document.title = 'Training Schedule Management Admin Dashboard'

    axiosInstance.get(`/tsms/session/${id}`).then((res) => {
      setSessionData(res.data)
    })
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
          <span className="font-semibold">Session Organizer:</span>{' '}
          {sessionData.sessionOrganizer}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Session location:</span>{' '}
          {sessionData.location}
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

        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="block">
            <p className="mb-4">
              <span className="font-semibold">Description:</span>
            </p>
            <textarea
              className="mb-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              disabled={true}
              value={sessionData.sessionDesc}
            ></textarea>
          </div>

          <div className="block">
            <p className="mb-4">
              <span className="font-semibold">Materials:</span>
            </p>
            <textarea
              className="mb-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              disabled={true}
              value={sessionData.sessionMaterials}
            ></textarea>
          </div>
        </div>

        {/* Interns */}
        <p className="mb-4">
          <span className="font-semibold">Participants:</span>
        </p>
        {sessionData.participantEmails &&
        sessionData.participantEmails.length > 0 ? (
          sessionData.participantEmails.map((participant) => (
            <p key={participant.email} className="mb-1">
              {participant.email}
            </p>
          ))
        ) : (
          <p>No participants found</p>
        )}
      </div>
    </Dashboard>
  )
}

export default AdminViewSessionPage
