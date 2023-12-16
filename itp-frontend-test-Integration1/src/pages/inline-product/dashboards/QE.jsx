import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAdd,
  faAddressBook,
  faArrowRightFromBracket,
  faEye,
  faHand,
  faMagnifyingGlass,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Greeting, MiniCard } from '../../../components/common'

const QEDashboard = () => {
  useEffect(() => {
    document.title = 'Quality Executive Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/inline-product-mgt/QE/create-exam',
              name: 'Create Exam Paper',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faAddressBook}
                />
              ),
            },
            {
              path: '/inline-product-mgt/QE/evaluate',
              name: 'Evaluate Exam Papers',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMagnifyingGlass}
                />
              ),
            },
            {
              path: '/inline-product-mgt/QE/Dashboard',
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
      <div className="grid grid-cols-4">
        <div className="content col-span-3 px-12 py-8">
          <div className="block my-6">
            <p className="text-3xl text-[#FFA14E] font-bold mb-4">
              <Greeting />
            </p>
            <p className="text-3xl">Quality Executive Dashboard</p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Create"
              subtitle="Final Examination Paper"
              link="/inline-product-mgt/QE/create-exam"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faAdd}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Evaluate"
              subtitle="Final Examination Paper"
              link="/inline-product-mgt/QE/evaluate"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faHand}
                />
              }
            ></MiniCard>
            <MiniCard
              title="View "
              subtitle="Team Member Summary Sheet"
              link="/"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faEye}
                />
              }
            ></MiniCard>
          </div>
        </div>

        <div className="info-sidebar col-span-1 bg-[#FAFAFA] min-h-screen px-6 pt-6 flex">
          <img
            src={'/static/illustrations/QA engineers-bro 1.svg'}
            alt="Login illustration"
          />
        </div>
      </div>
    </Dashboard>
  )
}

export default QEDashboard
