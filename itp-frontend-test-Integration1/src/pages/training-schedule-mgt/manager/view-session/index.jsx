import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faCheck,
  faCircleMinus,
  faClock,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import { useParams } from 'react-router-dom'

const ManagerViewSessionPage = () => {
  let { id } = useParams()
  const [sessionData, setSessionData] = useState({})

  useEffect(() => {
    document.title = 'Training Schedule Management Admin Dashboard'

    axiosInstance.get(`/tsms/session/${id}`).then((res) => {
      setSessionData(res.data)
      console.log(res.data)
    })
  }, [])

  const updateRecord = (email, payload) => {
    const updatedSessionData = { ...sessionData }
    let indexToReplace = updatedSessionData.participantEmails.findIndex(
      (participant) => {
        return participant.email === email
      }
    )
    updatedSessionData.participantEmails[indexToReplace] = payload
    setSessionData(updatedSessionData)
  }

  const markPresent = (email) => {
    const payload = {
      email,
      attendance: {
        present: true,
        absent: false,
        late: false,
      },
    }
    axiosInstance.put(`/tsms/attendance/${id}`, payload).then(() => {
      updateRecord(email, payload)
    })
  }

  const markLate = (email) => {
    const payload = {
      email,
      attendance: {
        present: false,
        absent: false,
        late: true,
      },
    }
    axiosInstance.put(`/tsms/attendance/${id}`, payload).then(() => {
      updateRecord(email, payload)
    })
  }

  const markAbsent = (email) => {
    const payload = {
      email,
      attendance: {
        present: false,
        absent: true,
        late: false,
      },
    }
    axiosInstance.put(`/tsms/attendance/${id}`, payload).then(() => {
      updateRecord(email, payload)
    })
  }

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
      <div className="block mt-6 p-8">
        <p className="text-3xl">Session &#x3E; {sessionData.sessionName}</p>
      </div>

      <div className="block px-8">
        {/* Interns */}
        <p className="mb-4">
          <span className="text-xl">
            Bellow is a list of all participants registered to the session. You
            can use this interface to make mark the attendance of the interns:
          </span>
        </p>
        <br />
        <hr className="h-px my-5 bg-gray-700 border-0" />

        {sessionData.participantEmails &&
        sessionData.participantEmails.length > 0 ? (
          sessionData.participantEmails.map((participant) => (
            <>
              <div className="flex items-center">
                <p key={participant.email} className="mb-1 mr-6">
                  {participant.email}
                </p>

                <button
                  className={`${
                    participant.attendance.present
                      ? 'bg-[#689F38] text-white'
                      : 'text-[#424242]'
                  } text-md border-2 border-[#689F38] hover:bg-[#689F38] hover:text-white rounded-lg px-8 py-1.5 my-4 block mx-4`}
                  onClick={() => markPresent(participant.email)}
                >
                  <FontAwesomeIcon className="pr-3" icon={faCheck} size="1x" />
                  Present
                </button>

                <button
                  className={`${
                    participant.attendance.late
                      ? 'bg-[#EAB100]'
                      : 'text-[#424242]'
                  } text-md border-2 border-[#EAB100] hover:bg-[#EAB100] rounded-lg px-8 py-1.5 my-4 block mx-4`}
                  onClick={() => markLate(participant.email)}
                >
                  <FontAwesomeIcon className="pr-3" icon={faClock} size="1x" />
                  Late
                </button>

                <button
                  className={`${
                    participant.attendance.absent
                      ? 'bg-[#A4161A] text-white'
                      : 'text-[#424242]'
                  } text-md border-2 border-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-8 py-1.5 my-4 block mx-4`}
                  onClick={() => markAbsent(participant.email)}
                >
                  <FontAwesomeIcon
                    className="pr-3"
                    icon={faCircleMinus}
                    size="1x"
                  />
                  Absent
                </button>
              </div>
              <hr className="h-px my-5 bg-gray-700 border-0" />
            </>
          ))
        ) : (
          <p>No participants found</p>
        )}
      </div>
    </Dashboard>
  )
}

export default ManagerViewSessionPage
