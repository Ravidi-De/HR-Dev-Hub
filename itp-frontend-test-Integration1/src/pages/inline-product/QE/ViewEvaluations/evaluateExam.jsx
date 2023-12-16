import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressBook,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { Button, Dashboard, Loader } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import ViewTable from './view-table'
import { timeAdjust } from '../../../../utils/time'
import { Link, useNavigate } from 'react-router-dom'

const QEEvaluate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState([])
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    document.title = 'View all sessions'

    axiosInstance.get('/ipm/exam').then((res) => {
      setIsLoading(false)
      const data = []
      res.data.forEach((examAppointment) => {
        /* prettier-ignore */
        const { _id, ExamType, InvigilatorEmpID , StartTimestamp, EndTimestamp } = examAppointment
        /* prettier-ignore */
        data.push({
          _id: () => (<p className='cursor-pointer' onClick={() => navigate(`/inline-product-mgt/QE/view-exam/${_id}`)}>{ _id }</p>),
          ExamType,
          date: new Date(StartTimestamp).toDateString(),
          sessionStartTime: timeAdjust(StartTimestamp),
          sessionEndTime: timeAdjust(EndTimestamp),
          InvigilatorEmpID,
        onEdit: () => (<Link to={`/inline-product-mgt/QE/edit-exam/${_id}`}>
        <Button className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto">
            Edit
          </Button></Link>)
        })
      })
      setSessionData(data)
    })
  }, [])

  const filteredData = sessionData.filter(
    (session) =>
      session.ExamType.toLowerCase().includes(searchText.toLowerCase()) ||
      session.InvigilatorEmpID.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleSearchChange = (value) => {
    setSearchText(value)
  }

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
          <div className="block my-6 mb-12 p-8">
            <p className="text-3xl font-semibold mb-4">Evaluate Exam Paper</p>
            <p className="text-xl mb-12">
              Here is the list of the completed candidates.
            </p>

            <div className="mb-4">
              <label
                htmlFor="search"
                className="block text-xl font-medium text-gray-900 mb-4"
              >
                Search Exams:
              </label>
              <input
                type="text"
                id="search"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search exams by Exam Type, or Invigilator..."
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <ViewTable
              data={filteredData}
              itemsPerPage={5}
              customHeaders={[
                'Exam ID',
                'Exam Type',
                'DATE',
                'START TIME',
                'END TIME',
                'Invigilator',
                '',
                '',
              ]}
            />
          </div>
        </Dashboard>
      )}
    </>
  )
}

export default QEEvaluate
