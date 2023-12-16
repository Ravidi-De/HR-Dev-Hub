import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faChartSimple,
  faFile,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Button, Dashboard, Loader } from '../../../components/common'
import { BasicTabs } from '../../../components/IT21833298'
import { axiosInstance } from '../../../config'
import { Link } from 'react-router-dom'

const SkillMatrixManagerReceivedSurvey = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [surveyData, setSurveyData] = useState({})

  useEffect(() => {
    setIsLoading(true)
    document.title = 'Skill Matrix Manager Received Survey'

    axiosInstance.get('/sms/survey/').then((res) => {
      setIsLoading(false)
      const data = []
      res.data.forEach((survey) => {
        /* prettier-ignore */
        const { _id, TraineeID, Description, IsReviewed,TraineeName} = survey
        /* prettier-ignore */
        data.push({
          _id,
          IsReviewed,
          TraineeID,
          Description,
          TraineeName,
          onEdit: () => (<Link to={`/skill-matrix/survey/Manager/evaluate/${_id}`}>
          <Button className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto">
              Edit
            </Button></Link>)
          })
      })
      setSurveyData(data)
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
                <p className="text-3xl font-semibold mb-2"> Received Survey</p>
              </div>
              <div>
                <BasicTabs data={surveyData} />
              </div>
            </div>
          </div>
        </Dashboard>
      )}
    </>
  )
}

export default SkillMatrixManagerReceivedSurvey
