import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BasicFooter = () => {
  return (
    <footer className="bg-[#161A1D] shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <FontAwesomeIcon
              className="text-white text-5xl my-4 lg:text-4xl pr-3"
              icon={faBriefcase}
              size="1x"
            />
            <p className="markazi-text text-5xl my-4 lg:text-4xl font-medium tracking-widest text-white">
              HR DevHub
            </p>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-md font-medium text-gray-400 sm:mb-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-md text-gray-400 sm:text-center">
          © {new Date().getFullYear()}{' '}
          <a href="/" className="hover:underline">
            HR DevHub
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default BasicFooter
