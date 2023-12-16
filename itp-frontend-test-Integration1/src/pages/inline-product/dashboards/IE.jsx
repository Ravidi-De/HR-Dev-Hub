import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAdd,
  faArrowRightFromBracket,
  faClipboardUser,
  faComment,
  faEye,
  faFilePdf,
  faHand,
  faHome,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  Calendar,
  Dashboard,
  Greeting,
  MiniCard,
} from '../../../components/common'

const IEDashboard = () => {
  useEffect(() => {
    document.title = 'Industrial Engineer Dashboard'
  }, [])

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/',
              name: 'View Skill Index',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faComment}
                />
              ),
            },
            {
              path: '/inline-product-mgt/IE/OnJobTraining',
              name: 'On the Job Training',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faClipboardUser}
                />
              ),
            },
            {
              path: '/inline-product-mgt/IE/Login',
              name: 'Login Page',
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
            <p className="text-3xl">Industrial Engineer Dashboard</p>
          </div>

          <div className="flex mt-16">
            <MiniCard
              title="Create"
              subtitle="TM Request Form"
              link="/inline-product-mgt/IE/TMReq"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faAdd}
                />
              }
            ></MiniCard>
            <MiniCard
              title="Evaluate"
              subtitle="On the job training"
              link="/inline-product-mgt/IE/OnJobTraining"
              icon={
                <FontAwesomeIcon
                  className="text-[#A4161A] text-4xl"
                  icon={faHand}
                />
              }
            ></MiniCard>
            <MiniCard
              title="View "
              subtitle="Skill Index"
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
            src={"/static/illustrations/Strategic consulting-pana.svg"}
            alt="Login illustration"
          />

          
        </div>
      </div>
    </Dashboard>
  )
}

export default IEDashboard
