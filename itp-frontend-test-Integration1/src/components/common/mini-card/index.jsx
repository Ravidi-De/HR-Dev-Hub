import { Link } from 'react-router-dom'
import Modal from '../modal'

const MiniCard = ({
  title,
  subtitle,
  icon,
  link,
  isModalOpen,
  toggleModal,
  modalTitle,
  children,
}) => {
  return !toggleModal ? (
    <Link
      to={link}
      className="block w-72 p-6 border-2 border-[#D3D3D3] rounded-2xl hover:bg-gray-100 mr-8 mb-6"
    >
      <div className="rounded-full border-4 border-[#D3D3D3] w-fit p-4 mb-4">
        {icon}
      </div>
      <h5 className="mb-2 text-2xl font-semibold text-gray-900">{title}</h5>
      <p className="font-normal text-gray-500">{subtitle}</p>
    </Link>
  ) : (
    <>
      <div
        onClick={() => toggleModal(!isModalOpen)}
        className="block w-72 p-6 border-2 border-[#D3D3D3] rounded-2xl hover:bg-gray-100 mr-8 cursor-pointer mb-6"
      >
        <div className="rounded-full border-4 border-[#D3D3D3] w-fit p-4 mb-4">
          {icon}
        </div>
        <h5 className="mb-2 text-2xl font-semibold text-gray-900">{title}</h5>
        <p className="font-normal text-gray-500">{subtitle}</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        toggleModal={() => toggleModal(!isModalOpen)}
        title={modalTitle}
        className="w-full lg:w-9/12"
      >
        {children}
      </Modal>
    </>
  )
}

export default MiniCard
