import { useState } from 'react'
import { Modal } from '../../../../components/common'
import './styles.scss'

const Section2 = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isDstModalOpen, setIsDstModalOpen] = useState(false)

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

        <div className="destinations">
          <div
            className="flex overlay h-full w-full justify-center items-center"
            onClick={() => setIsDstModalOpen(!isDstModalOpen)}
          >
            <p className=" text-center markazi-text text-6xl text-white">
              Member Contributions
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

      {/* Destination Modal */}
      <Modal
        isOpen={isDstModalOpen}
        toggleModal={() => setIsDstModalOpen(!isDstModalOpen)}
        title="Member Contributions"
        className="w-full lg:w-9/12"
      >
        <div className="block mt-4 pb-6">
          <h2 className="text-2xl">
            1. Administrative Task Management - IT21832826
          </h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            Plays a crucial role in helping trainees adapt to the corporate
            environment. It guides trainees throughout their training period,
            starting with a personalized welcome email containing greetings from
            other employees. The system utilizes the Calendar API to schedule
            induction, tours, process walkthroughs, and guidance sessions,
            ensuring trainees become familiar with their new surroundings. It
            generates budgeting reports for these events and allows HR officers
            to view reports from other system components, aiding in
            decision-making for business operations. Additionally, the system
            offers a space for trainees to access content that fosters essential
            qualities for their career development. Overall, the function
            ensures a smooth and supportive experience for trainees during their
            internship.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">
            2. Registration and Profile Management - IT21298776
          </h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            This system offers a user-friendly solution for managing employee
            (Trainee) information in an organization, focusing on two types:
            factory workers and management interns (Undergraduates). The process
            involves registration through admin login, facilitated by a front
            desk person. After registration, trainees receive personal login
            credentials to update their information. Management interns can
            upload CVs, analyzed by an AI tool. The system generates a date and
            time for HR interviews. Admins can search, filter, and view trainee
            profiles, along with generating detailed individual reports.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">
            3. Training School Activity Management System - IT21833366
          </h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            Activity Management system is designed to manage all the Fundamental
            Activity related process in training school. And it allows you to
            manage all the activity related tasks anywhere at any time. This
            system allows teachers to manage various activities in the training
            school. Teachers can log in and update trainees progress, introduce
            training induction, and track day-to-day activities, including
            sewing and machine operation and many more fundamental activities.
            The system also facilitates internal evaluation tests to assess
            trainees understanding and progress, and upon completion, teachers
            update the team members overview to meet line requirements and
            generate and send comprehensive reports to HR. Overall, the system
            provides a streamlined approach to managing training activities and
            progress within the training school.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">
            4. Production Onboarding & Evaluation System - IT21833120
          </h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            The Inline Production Onboarding and Evaluation System is a
            comprehensive software solution designed to streamline the
            onboarding process and efficiently evaluate the performance of new
            employees in the production department. The system aims to enhance
            the training effectiveness, ensure smooth line transfers, and
            optimize the overall production workflow. It will be utilized by
            Industrial Engineering, Quality Executives, and Production Executive
            departments to assess the competency and progress of newly onboarded
            employees.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">
            5. Training Schedule Management System - IT21801204
          </h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            This is a system designed to offer unique and efficient training
            experiences for interns based on their recruited departments. Admins
            can schedule sessions to provide interns with a comprehensive
            understanding of interconnected departments. They track attendance
            and monitor progress, sending automatic email notifications to
            relevant department managers upon session scheduling. The system
            ensures seamless communication and a well-organized training
            environment, allowing interns to focus on learning and growth while
            receiving tailored training. Overall, it optimizes the training
            process, benefiting both interns and the organization.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">
            6. Attendance and Payroll Management - IT21838002
          </h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            The proposed attendance recording system is a comprehensive HR
            management system for development of an advanced Attendance Tracker
            and Payroll Management System based on QR code attendance tracking.
            The system integrates attendance tracking techniques with
            microservices and MVC architecture for efficient management and
            processing. The primary goal is to leverage attendance data for
            accurate payroll calculation while providing seamless interaction
            and streamlined management for administrators and employees.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">7. Trainee Diary System - IT21833298</h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            The Intern Diary Online System offer a comprehensive solution to a
            number of problems that HR departments encounter frequently when
            keeping track of the development of their interns. It&#x27;s a
            centralized platform for interns to interact, track their tasks,
            reflect on their experiences, and access vital tools. Additionally,
            HR personnel gain a comprehensive comprehension of the interns&#x27;
            journey, allowing them to provide personalized guidance and support
            while ensuring alignment with the company&#x27;s goals and values.
          </p>
        </div>

        <div className="block pb-6">
          <h2 className="text-2xl">8. Skill Matrix System - IT21838002</h2>
          <p className="text-lg ml-4 mt-4 text-justify">
            The Skill Matrix System is an essential component of our initiative,
            allowing trainees and managers to collaboratively evaluate
            abilities, produce reports, and offer AI-enhanced feedback, which is
            critical for informed decision-making on intern trainees&#x27;
            potential for permanent employment.
          </p>
        </div>
      </Modal>
    </>
  )
}

export default Section2
