import Button from '../../../components/common/button'
import Login from '../../../components/common/login'
import { Link } from 'react-router-dom'

const InstructorLogin = () => {
  return (
    <Login
      title="Training School Instructor Login"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
      illustrationUrl="/static/illustrations/Admin-Login.svg"
      quoteText="Forgive yourself for not knowing what you didn’t know before you learned it."
      quoteAuthor="Maya Angelou"
    >
      <form className="flex flex-col">
        <div className="mb-8">
          <label
            htmlFor="admin-email"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Instructor Email:
          </label>
          <input
            type="text"
            id="manager-email"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="me@example.com"
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="first_name"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <Link to="/training-scl-activity-mgt/dashboard">
          <Button className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
            Login
          </Button>
        </Link>

      </form>
    </Login>
  )
}

export default InstructorLogin