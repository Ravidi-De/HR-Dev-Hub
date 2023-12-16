import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Modal = ({ title, className = '', isOpen, toggleModal, children }) => {
  return (
    <div
      id="modal"
      className={`${
        isOpen ? 'flex' : 'hidden'
      } justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full bg-[#000000a3]`}
    >
      <div className={`relative ${className}`}>
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="markazi-text text-4xl text-gray-900">
              {title || 'Modal Title'}
            </h3>
            <button
              type="button"
              className="rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            >
              <FontAwesomeIcon
                className="text-4xl"
                icon={faClose}
                onClick={toggleModal}
              />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6 h-[75vh] overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
