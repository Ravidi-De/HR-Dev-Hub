import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRightFromBracket,
    faClipboardUser,
    faComment,
    faHome,
  } from '@fortawesome/free-solid-svg-icons'
import { axiosInstance } from '../../../config'
import { Dashboard, Loader } from '../../../components/common'

const InternContentSpace = () => {
  const [sessionData, setSessionData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.title = 'Admin Task Management - Content Space'
    setIsLoading(true)
    axiosInstance.get(`/atm/content`).then((res) => {
      setSessionData(res.data)
      setIsLoading(false)
    })
  }, [])

console.log(sessionData)


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
                        )
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
                ]
            }
            ]}
        >
          <div className="block my-6">
            <p className="text-3xl ml-12">Content Space</p>
            <p className="text-2xl ml-12 mt-6">We treasure your happiness</p>
          </div>
          <div className="block min-h-[80vh] py-6">
                {sessionData &&
                  sessionData.map((item) => {
                    return (
                      <div className="block w-3/4	mx-auto	my-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"  key={item._id}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.empQuote}</h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">{item.empName}</p>
                      </div>
                    )
                  })}
              </div>         
        </Dashboard>
        )}
        </>
        
    )

}

export default InternContentSpace