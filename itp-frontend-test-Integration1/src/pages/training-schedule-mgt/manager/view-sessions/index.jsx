import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Loader } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import { SessionsTable } from './components'
import { timeAdjust } from '../../../../utils/time'
import { useNavigate } from 'react-router-dom'

const ManagerViewSessionsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    document.title = 'View manager sessions'

    axiosInstance.get('/tsms/session/manager').then((res) => {
      setIsLoading(false)
      const data = []
      res.data.forEach((session) => {
        /* prettier-ignore */
        const { _id, sessionName, sessionOrganizer, sessionStartTimestamp, sessionEndTimestamp, location } = session
        /* prettier-ignore */
        data.push({
          _id: () => (<p className='cursor-pointer' onClick={() => navigate(`/training-schedule-mgt/manager/sessions/${_id}`)}>{ _id }</p>),
          sessionName: sessionName,
          date: new Date(sessionStartTimestamp).toDateString(),
          sessionStartTime: timeAdjust(sessionStartTimestamp),
          sessionEndTime: timeAdjust(sessionEndTimestamp),
          sessionOrganizer,
          location,
        })
      })
      setSessionData(data)
    })
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
          <div className="block my-6 mb-12 p-8">
            <p className="text-3xl font-semibold mb-4">View manager sessions</p>
            <p className="text-xl mb-12">
              Here is the list of the available sessions.
            </p>

            <SessionsTable
              data={sessionData}
              itemsPerPage={5}
              customHeaders={[
                'SESSION ID',
                'SESSION NAME',
                'DATE',
                'START TIME',
                'END TIME',
                'ORGANIZER',
                'MODE',
              ]}
            />
          </div>
        </Dashboard>
      )}
    </>
  )
}

export default ManagerViewSessionsPage
