import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBriefcase, faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const BasicHeader = () => {
  const [sidemMenuOpen, setSidemMenuOpen] = useState(false)
  const links = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
  ]

  const toggleNavbar = () => {}

  return (
    <>
      <nav
        id="basic-header"
        className="flex justify-between items-center px-4 lg:px-24 py-8 z-50 absolute top-0 w-full"
      >
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white text-5xl lg:text-6xl pr-5"
            icon={faBriefcase}
            size="1x"
            onClick={toggleNavbar}
          />
          <p className="markazi-text text-5xl lg:text-6xl font-medium tracking-widest text-white">
            HR DevHub
          </p>
        </div>
        <div className="block">
          {sidemMenuOpen ? (
            <FontAwesomeIcon
              className="text-white text-4xl lg:text-5xl hover:cursor-pointer"
              icon={faClose}
              onClick={() =>
                setSidemMenuOpen((sidemMenuOpen) => !sidemMenuOpen)
              }
            />
          ) : (
            <FontAwesomeIcon
              className="text-white text-4xl lg:text-5xl hover:cursor-pointer"
              icon={faBars}
              onClick={() =>
                setSidemMenuOpen((sidemMenuOpen) => !sidemMenuOpen)
              }
            />
          )}
        </div>
      </nav>

      <div
        className={`sidebar fixed top-0 left-0 flex-col w-80 h-screen bg-[#fff] text-black border-r-2 border-[#333] ${
          sidemMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-500 z-50`}
      >
        <ul className="flex-grow pt-5">
          {links.map((link, index) => (
            <li
              key={index}
              className="p-4 transition ease-in-out duration-300 hover:bg-orange-300 cursor-pointer"
            >
              <Link to={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BasicHeader
