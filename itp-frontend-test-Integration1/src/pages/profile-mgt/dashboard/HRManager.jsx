import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket, faCashRegister, faClipboardUser, faComment, faDollar, faDollarSign, faFilePdf, faHome, faLayerGroup,faQuestionCircle ,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
  MiniCard,
} from '../../../components/common'

const HRManagerDashboard = () => {
  useEffect(() => {
    document.title = 'HR Manager Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/profile-mgt/ViewTrainees/view',
              name: 'View Trainees',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faComment}
                />
              ),
            },
            {
              path: '/profile-mgt/AddTrainees/add',
              name: 'Add New Trainee',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faClipboardUser}
                />
              ),
            },
            {
              path: '/profile-mgt/HRmanager/dashboard',
              name: 'Dashboard',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/profile-mgt/SendInquries/Inquiries',
              name: 'Inquiries',
              icon: () => (
                  <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faQuestionCircle}
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
            <p className="text-3xl">HR Manager Dashboard</p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Trainees"
              subtitle="View All Trainees"
              link="/profile-mgt/ViewTrainees/view"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faLayerGroup}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Report"
              subtitle="Generate Trainee report"
              link="/"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faFilePdf}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Payment"
              subtitle="Payroll Management"
              link="/"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faDollarSign}
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

export default HRManagerDashboard
