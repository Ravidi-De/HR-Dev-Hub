import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faChartSimple,
  faFile,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../components/common'
import { Project } from '../../../components/IT21833298'

const SkillMatrixManagerProject = () => {
  useEffect(() => {
    document.title = 'Skill Matrix Manager Projects'
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
      <div className="grid grid-cols-1">
        <div className="content col-span-3 px-12 py-8">
          <div className="block my-6">
            <p className="text-3xl font-semibold mb-2"> Projects</p>
          </div>
          <div>
            <Project />
          </div>

          <div></div>

          <div className="flex mt-16"></div>
        </div>
      </div>
    </Dashboard>
  )
}

export default SkillMatrixManagerProject
