import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faClipboardUser,
  faComment,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Loader } from '../../../components/common'
import { axiosInstance } from '../../../config'
import { Link } from 'react-router-dom'
import { InputGroup, Form } from 'react-bootstrap'

const ViewGreets = () => {
  const [sessionData, setSessionData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')


  useEffect(() => {
    document.title = 'Admin Task Management - Submissions'
    setIsLoading(true)
    axiosInstance.get(`/atm/greetings`).then((res) => {
      setSessionData(res.data)
      setIsLoading(false)
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
                  path: '/admin-task-mgt/dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/greetings',
                  name: 'Greetings',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faComment}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/content-space',
                  name: 'Content Space',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faClipboardUser}
                    />
                  ),
                },
                {
                  path: '/admin-task-mgt/scheduler',
                  name: 'Scheduling',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                // {
                //   path: '/admin-task-mgt/reports',
                //   name: 'Reports',
                //   icon: () => (
                //     <FontAwesomeIcon
                //       className="mr-4 text-3xl text-gray-300"
                //       icon={faHome}
                //     />
                //   ),
                // },
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
          <div className="grid">
            <div className="content px-12 py-8">
              <div className="block my-6">
                <p className="text-3xl">Submissions</p>
              </div>

              <Form>
                  <InputGroup>
                    <Form.Control onChange={(e) => setSearch(e.target.value)}
                     placeholder="Search"/>
                  </InputGroup>
              </Form>

              <div className="block my-8 bg-red-50 min-h-[80vh] py-12">
                {sessionData &&
                  sessionData.filter((greet) => {
                    return search.toLowerCase() === '' 
                    ? greet 
                    : greet.message.toLowerCase().includes(search)
                  }).map((greet) => {
                    return (
                      <div className="grid grid-cols-7 gap-3" key={greet._id}>
                        <Link
                          className="col-span-6"
                          to={`/admin-task-mgt/greetings/view/${greet._id}`}
                        >
                          <p className="text-xl bg-gray-300 p-5 mx-4 mb-8 rounded-xl">
                            {greet.message}
                          </p>
                        </Link>

                        <div className="block col-span-1 px-4">
                          <button
                            className="h-11 w-full text-md border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg my-1 block"
                            onClick={() => {
                              navigator.clipboard.writeText(greet.message)
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </Dashboard>
      )}
    </>
  )
}

export default ViewGreets
