import { useEffect } from "react"
import { Dashboard } from "../../../components/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faComment,
    faClipboardUser,
    faHome,
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"

const AdminTaskMgtContentSpace = () => {
    useEffect(() => {
        document.title='Admin Task Management Dashboard'
    }
    )

    return(
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
                    // {
                    //     path: '/admin-task-mgt/reports',
                    //     name: 'Reports',
                    //     icon: () => (
                    //       <FontAwesomeIcon
                    //         className="mr-4 text-3xl text-gray-300"
                    //         icon={faHome}
                    //       />
                    //     ),
                    //   },
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
            <div className="grid">
                <div className="content px-12 py-8">
                    <div className="block my-6">
                        <p className="text-3xl">Content Space</p>
                    </div>
                </div>
                <p className="text-2xl mb-4 mx-12">Dear Employees,</p>
                    <p className="text-2xl leading-10 mx-12 mb-8">
                        We appreciate your support in helping us fulfill our goal of
                        making a better work environment <br /> for all. 
                        Thank you!
                    </p>
                <div className="flex flex-wrap mt-0">
                    <section className="bg-white">
                        <div className="block mt-0 w-screen">
                            <Link to='/admin-task-mgt/content-space/add'>
                            <div
                                className="block ml-24 p-6 mb-8 text-lg border-red-800 border-2 text-red-800 rounded-tl-2xl rounded-br-2xl bg-red-50 w-full lg:w-2/3 hover:scale-105 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                                role="alert"
                            >
                                Add Content
                            </div>
                            </Link>
                            <Link to='/admin-task-mgt/intern-content-space'>
                            <div
                                className="block ml-24 p-6 mb-8 text-lg border-red-800 border-2 text-red-800 rounded-tl-2xl rounded-br-2xl bg-red-50 w-full lg:w-2/3 hover:scale-105 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                                role="alert"
                            >
                                Content Space
                            </div>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </Dashboard>
    )
}

export default AdminTaskMgtContentSpace