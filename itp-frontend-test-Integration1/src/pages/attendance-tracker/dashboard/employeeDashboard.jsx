import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faMoneyBillTransfer,
  faCalendarDay,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard } from '../../../components/common'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  faArrowRightFromBracket,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react'
import Calendar from 'react-calendar'
import '../assets/calendar.css'

const EmployeeDashboard = () => {
  const [date, setDate] = useState(new Date())
  const handleDateChange = (newDate) => {
    setDate(newDate)
    // Handle any actions when the date is selected
  }
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleLogout = ()=>{
    Navigate(`/logout`)
  }

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Menu',
          children: [
            {
              path: '/profile-mgt/HRmanager/dashboard',
              name: 'Home',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faHome}
                />
              ),
            },
            {
              path: '/attendance-tracker/employeeDashboard',
              name: 'Attendance',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faCalendar}
                />
              ),
            },
            {
              path: '/leave-manager/empDashboard',
              name: 'Leaves',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMoneyBillTransfer}
                />
              ),
            },
          ],
        },
      ]}
    >
      <>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <h5>
                <FontAwesomeIcon icon={faHandshake} className="text-warning" />{' '}
                Good Afternoon
              </h5>
            </div>
            <div className="col-md-6 d-flex">
              <button className="btn btn-danger ml-auto" onClick={()=> handleLogout()}>Logout
              </button>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-12 text-center">
              <div className="d-flex justify-content-center">
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '50vh',
                      marginTop: '10vh',
                    }}
                  >
                    <div className="calendar">
                      <Calendar
                        onChange={handleDateChange}
                        value={date}
                        style={{ color: '#000000' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 ">
          <div
            className="row"
            style={{ justifyContent: 'space-between', marginTop: '10vh' }}
          >
            <div class="col-4">
              <a
                href="/leave-manager/create"
                class="btn btn-danger btn-lg active"
                role="button"
                aria-pressed="true"
                onClick={'/leave-manager/create'}
              >
                Request a leave
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  style={{ fontSize: 15, marginLeft: '5px' }}
                />
              </a>
            </div>
            <div
              class="col-4 text-right"
              style={{ justifyContent: 'flex-end' }}
            >
              <a
                href="/attendance-tracker/newQR"
                class="btn btn-danger btn-lg active"
                role="button"
                aria-pressed="true"
              >
                Create QR
                <FontAwesomeIcon
                  icon={faQrcode}
                  style={{ fontSize: 15, marginLeft: '5px' }}
                />
              </a>
            </div>
          </div>
        </div>
      </>
    </Dashboard>
  )
}

export default EmployeeDashboard

import { useEffect } from 'react'
import { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import { faHandshake, faFile, faClock } from '@fortawesome/free-solid-svg-icons'
import { Navigate } from 'react-router-dom'

