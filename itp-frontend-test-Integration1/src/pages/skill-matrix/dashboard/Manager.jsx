import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faChartSimple,
  faFile,
  faFilePdf,
  faHome,
  faLayerGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
  MiniCard,
} from '../../../components/common'

const SkillMatrixManagerDashboard = () => {
  useEffect(() => {
    document.title = 'Skill Matrix Manager Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '#',
              name: 'Skill Survey',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faFile}
                />
              ),
            },
            {
              path: '#',
              name: 'Projects',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faChartSimple}
                />
              ),
            },
            {
              path: '/skill-matrix/manager/dashboard',
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
            <p className="text-3xl">Skill Matrix Manager Dashboard</p>
          </div>
          <div>
            <p>
              Managers, your evaluations drive trainee growth and future
              employment prospects. Your feedback matters. Thank you for your
              crucial role in our skill development initiative.
            </p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Survey"
              subtitle="View Survey"
              link="/skill-matrix/survey/Manager/received"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faFile}
                />
              }
            ></MiniCard>

            <MiniCard
              title="Projects"
              subtitle="View Projects"
              link="#"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faLayerGroup}
                />
              }
            ></MiniCard>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Trainee List"
              subtitle="View Trainees"
              link="#"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faUsers}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Report"
              subtitle="Report Submission"
              link="#"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faFilePdf}
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

export default SkillMatrixManagerDashboard
