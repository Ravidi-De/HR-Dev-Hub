import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faChartLine,
  faClipboardUser,
  faClock,
  faGear,
  faSchool,
  faScrewdriverWrench,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../../../components/common/'
import { Link } from 'react-router-dom'

const Section3 = () => {
  return (
    <div id="section3">
      <p className="py-14 text-center text-6xl markazi-text text-white capitalize">
        System Functions
      </p>
      <Swiper
        id="swipper"
        className="pb-16"
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          10: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faScrewdriverWrench}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Administrative Task Management
            </p>
            <Link to="/admin-task-mgt/login">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faUserGroup}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Registration and Profile Management
            </p>
            <Link to="/profile-mgt/HRmanager/dashboard">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faSchool}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Training School Activity Management
            </p>
            <Link to="/training-scl-activity-mgt/login">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faGear}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Production Onboarding & Evaluation
            </p>
            <Link to="/inline-product-mgt/IE/Login">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faClock}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Training Schedule Management
            </p>
            <Link to="/training-schedule-mgt/admin/login">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faClipboardUser}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Attendance and Payroll Management
            </p>
            <Link to="/attendance-tracker/adminDashboard">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faBook}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Trainee Diary System
            </p>
            <Link to="/trainee-diary/login">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-slide py-12 px-5 h-96 flex items-center justify-center">
          <div className="block">
            <FontAwesomeIcon
              className="block mx-auto text-6xl text-white"
              icon={faChartLine}
            />
            <p className="text-center text-4xl pt-6 pb-2 text-white my-8 h-32">
              Skill Matrix System
            </p>
            <Link to="/skill-matrix/Intern/login">
              <Button className="text-xl border-2 border-[#FFFFFF] text-white hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto">
                Visit System
              </Button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Section3
