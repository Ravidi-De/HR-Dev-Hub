import { useState } from 'react'

const SessionsTable = ({ data, itemsPerPage, customHeaders }) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="w-full overflow-x-scroll">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Custom table headers */}
        <thead className="bg-gray-50">
          <tr>
            {customHeaders.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => (
            <tr key={item.sessionId}>
              {/* Render table columns based on the data keys */}
              {Object.keys(item).map((key) => (
                <td key={key} className="px-6 py-4 whitespace-nowrap">
                  {typeof item[key] == 'function' ? item[key]() : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            } px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700 text-white'
            } ml-3 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {indexOfFirstItem + 1} -{' '}
                {indexOfLastItem > data.length ? data.length : indexOfLastItem}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${
                    currentPage === i + 1
                      ? 'z-10 bg-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionsTable
