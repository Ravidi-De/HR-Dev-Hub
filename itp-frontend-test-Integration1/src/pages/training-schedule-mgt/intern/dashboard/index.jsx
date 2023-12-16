import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faHandshake,
  faHome,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
  CounterCard,
  MiniCard,
} from '../../../../components/common'
import sessionMock from './mock/sessions.json'

const TrainingScheduleMgtInternDashboard = () => {
  useEffect(() => {
    document.title = 'Training Schedule Management Manager Dashboard'
  }, [])

  const [responsibilityModalToggler, setResponsibilityModalToggler] =
    useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Function to filter sessions based on the search term
  const filteredSessions = sessionMock.filter((session) =>
    session.sessionName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/training-schedule-mgt/intern/dashboard',
              name: 'Dashboard',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/training-schedule-mgt/intern/dashboard/#',
              name: 'My Profile',
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
      <div className="grid grid-cols-4">
        <div className="content col-span-3 px-12 py-8">
          <div className="block my-6">
            <p className="text-3xl text-[#FFA14E] font-bold mb-4">
              <Greeting />
            </p>
            <p className="text-3xl">Training Schedule Intern Dashboard</p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Responsibilities"
              subtitle="Intern responsibilities"
              isModalOpen={responsibilityModalToggler}
              toggleModal={setResponsibilityModalToggler}
              modalTitle="Intern Responsibilities"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faHandshake}
                />
              }
            >
              <p className="text-lg">
                The responsibilities of the intern within the Training Schedule
                Management System include:
              </p>

              <p className="text-lg">
                <span className="font-bold">1. Attendance:</span> The intern is
                responsible for attending the scheduled training sessions as
                outlined in the system. They should ensure their presence during
                the designated dates and times.
              </p>

              <p className="text-lg">
                <span className="font-bold">2. Active Participation:</span>{' '}
                Interns are expected to actively participate in the training
                sessions, engaging with the content, asking questions, and
                contributing to discussions if required.
              </p>

              <p className="text-lg">
                <span className="font-bold">3. Preparation:</span> Before each
                training session, interns should review any materials or
                information provided by the system or the trainer to ensure they
                are prepared and can make the most of the session.
              </p>

              <p className="text-lg">
                <span className="font-bold">4. Self-Management:</span> Interns
                are responsible for managing their own schedule and ensuring
                they are available for the scheduled sessions. If they have any
                conflicts or issues, they should communicate promptly with the
                relevant parties.Self-Management: Interns are responsible for
                managing their own schedule and ensuring they are available for
                the scheduled sessions. If they have any conflicts or issues,
                they should communicate promptly with the relevant parties.
              </p>

              <p className="text-lg">
                <span className="font-bold">5. Feedback:</span> Interns may be
                asked to provide feedback on the quality and effectiveness of
                the training sessions. This feedback is valuable for improving
                the training program.Feedback: Interns may be asked to provide
                feedback on the quality and effectiveness of the training
                sessions. This feedback is valuable for improving the training
                program.
              </p>

              <p className="text-lg">
                <span className="font-bold">6. Learning and Growth:</span>{' '}
                Interns should actively seek to learn from the training
                sessions, acquire new skills, and apply the knowledge gained to
                their tasks and projects.
              </p>
            </MiniCard>
          </div>

          <div className="block my-16">
            <p className="text-3xl mb-8">Today sessions to attend</p>
            <input
              type="search"
              id=""
              className="block w-full md:w-3/4 xl:w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Session"
              onChange={handleSearchChange}
              required
            />
          </div>

          <div className="flex flex-col xl:flex-row">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {filteredSessions.map((session, index) => (
                <CounterCard key={session._id} counter={session._id}>
                  <p className="text-2xl">{session.sessionName}</p>
                  <p className="text-lg text-[#777] my-4">
                    {session.sessionDesc}
                  </p>
                  <a
                    href={session.sessionMeet}
                    className="text-lg text-[#A4161A] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Meeting
                  </a>
                </CounterCard>
              ))}
            </div>
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

export default TrainingScheduleMgtInternDashboard
