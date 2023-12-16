import { useState } from 'react'
import { Modal } from '../../common'
import './styles.scss'

const Report = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

  return (
    <>
      <section id="section2" className="grid grid-cols-1 lg:grid-cols-2">
        <div className="about">
          <div
            className="flex overlay h-full w-full justify-center items-center"
            onClick={() => setIsAboutModalOpen(!isAboutModalOpen)}
          >
            <p className=" text-center markazi-text text-6xl text-white">
              About HR DevHub
            </p>
          </div>
        </div>
      </section>

      {/* About Modal */}
      <Modal
        isOpen={isAboutModalOpen}
        toggleModal={() => setIsAboutModalOpen(!isAboutModalOpen)}
        title="About HR DevHub"
        className="w-full lg:w-9/12"
      >
        <img
          className="block mx-auto w-[450px] lg:w-[650px] drop-shadow-xl mt-12 mb-20"
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Logo_of_MAS_Holdings.png"
          alt="Preview"
        />

        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          accusantium sunt nihil quaerat eaque voluptate molestias, cupiditate
          optio consequuntur. Sapiente, magnam. Magnam aspernatur vero a velit
          alias est, laudantium voluptate accusantium autem quaerat repellat
          modi id libero. Reprehenderit ab non maxime in commodi quo eaque
          dolores corporis eum est harum reiciendis possimus, quaerat
          praesentium dolorem.
        </p>

        <p className="text-lg">
          Neque, non molestiae! Pariatur ratione id ea fuga dolores iure! Ipsum
          quidem maxime magni molestiae veritatis officiis minima, architecto
          laudantium aut nesciunt iste asperiores omnis mollitia, nostrum esse
          minus eaque vitae inventore. Iusto magni aliquid unde porro? Molestias
          totam sapiente suscipit possimus quae a perspiciatis!
        </p>
      </Modal>
    </>
  )
}

export default Report
