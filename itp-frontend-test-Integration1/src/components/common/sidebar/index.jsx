/* eslint-disable no-extra-semi */
import { Link } from 'react-router-dom'

// sectionLinks JSON Definition
// [
//     {
//         section: 'Sessions',
//         children: [
//             {
//                 path: '/sessions',
//                 name: 'View all sessions',
//                 icon: () => <FontAwesomeIcon className="block mx-auto text-6xl text-gray-300"icon={faUserGroup} />
//             },
//             {
//                 path: '/sessions/create',
//                 name: 'Create session',
//                 icon: () => <FontAwesomeIcon className="block mx-auto text-6xl text-gray-300"icon={faUserGroup} />
//             }
//         ]
//     },
//     {
//         section: 'Other Options',
//         children: [
//             {
//                 path: '/dashboard',
//                 name: 'Dashboard',
//                 icon: () => <FontAwesomeIcon className="block mx-auto text-6xl text-gray-300"icon={faUserGroup} />
//             }
//         ]
//     }
// ]

const Sidebar = ({ sectionLinks }) => {
  return (
    <div className="sidebar px-6 pt-6 bg-[#f7f7f7] top-0 left-0 sticky w-full border-r-2 border-[#f7f7f7] min-h-screen">
      <div className="sidebar-logo mb-16">
        <Link to="/">
          <img className="w-48" src="/static/logos/mas-logo.png" alt="logo" />
        </Link>
      </div>
      <div className="sidebar-menu">
        {sectionLinks.map((sectionItem, index) => (
          <div key={index} className="mb-6">
            <div className="block mb-6">
              <hr />
              <p className="my-6 font-bold text-xl">{sectionItem.section}</p>
              <hr />
            </div>
            {/* Iterate through children of the section */}
            {sectionItem.children.map((childItem, childIndex) => (
              <Link to={childItem.path} key={childIndex}>
                <div className="flex rounded-lg py-4 px-4 transition ease-in-out duration-75 delay-75 hover:bg-[#B5171A] hover:text-white mb-4">
                  {childItem.icon()}
                  {childItem.name}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>  
  )
}

export default Sidebar
