import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faTrash,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { Button, Dashboard, Loader } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import { SessionsTable } from './components'
import { time24hAdjust, timeAdjust } from '../../../../utils/time'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'

const AdminViewSessionsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [sessionData, setSessionData] = useState([])

  const navigate = useNavigate()

  const generatePdf = async (id) => {
    // PDF init
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const page = pdfDoc.addPage()

    axiosInstance.get(`/tsms/session/${id}`).then(async (res) => {
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { height } = firstPage.getSize()
      firstPage.drawText('Session Report', {
        x: 50,
        y: height / 2 + 350,
        size: 30,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      let y = 320

      const pdfFields = {
        SessionName: res.data.sessionName,
        SessionOrganizer: res.data.sessionOrganizer,
        Location: res.data.location,
        SessionStartTime: time24hAdjust(res.data.sessionStartTimestamp),
        SessionEndTime: time24hAdjust(res.data.sessionEndTimestamp),
        Description: res.data.sessionDesc,
        Materials: res.data.sessionMaterials,
      }

      Object.entries(pdfFields).forEach(([key, value]) => {
        page.drawText(`${key}: ${value}`, {
          x: 50,
          y: y / 2 + 550,
          size: 12,
          color: rgb(0, 0, 0),
        })
        y -= 75 // Adjust the vertical position for the next data row
      })

      const pdfBytes = await pdfDoc.save()
      download(
        pdfBytes,
        `${pdfFields.SessionName}-Session.pdf`,
        'application/pdf'
      )
    })
  }

  useEffect(() => {
    setIsLoading(true)
    document.title = 'View all sessions'

    axiosInstance.get('/tsms/session').then((res) => {
      setIsLoading(false)
      const data = []
      res.data.forEach((session) => {
        /* prettier-ignore */
        const { _id, sessionName, sessionOrganizer, sessionStartTimestamp, sessionEndTimestamp, location } = session
        /* prettier-ignore */
        data.push({
          _id: () => (<p className='cursor-pointer' onClick={() => navigate(`/training-schedule-mgt/admin/sessions/${_id}`)}>{ _id }</p>),
          sessionName: sessionName,
          date: new Date(sessionStartTimestamp).toDateString(),
          sessionStartTime: timeAdjust(sessionStartTimestamp),
          sessionEndTime: timeAdjust(sessionEndTimestamp),
          sessionOrganizer,
          location,
          onDelete: () => (<button onClick={() => deleteSession(_id)}>
            <FontAwesomeIcon
              className="text-red-600 text-2xl"
              icon={faTrash}
              size="1x"
            />
        </button>),
        onEdit: () => (<Link to={`/training-schedule-mgt/admin/sessions/edit/${_id}`}>
        <Button className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto">
            Edit
          </Button></Link>),
        downloadPdf: () => (
          <button onClick={() => generatePdf(_id)} className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto">
              Export
            </button>)
        })
      })
      setSessionData(data)
    })
  }, [])

  const deleteSession = (id) => {
    setIsLoading(true)
    axiosInstance.delete(`/tsms/session/${id}`).then((res) => {
      if (res.status === 200) {
        const data = sessionData.filter((session) => session._id !== id)

        setSessionData(data)
        setIsLoading(false)

        return Swal.fire({
          title: 'Session Cancelled',
          text: res.data.data,
          icon: 'success',
          button: 'Ok',
        })
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Dashboard
          sectionLinks={[
            {
              section: 'Sessions',
              children: [
                {
                  path: '/training-schedule-mgt/admin/sessions',
                  name: 'View all sessions',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
                    />
                  ),
                },
                {
                  path: '/training-schedule-mgt/admin/sessions/create',
                  name: 'Create session',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
                    />
                  ),
                },
              ],
            },
            {
              section: 'Other Options',
              children: [
                {
                  path: '/training-schedule-mgt/admin/dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
                    />
                  ),
                },
                {
                  path: '/logout',
                  name: 'Logout',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faArrowRightFromBracket}
                    />
                  ),
                },
              ],
            },
          ]}
        >
          <div className="block my-6 mb-12 p-8">
            <p className="text-3xl font-semibold mb-4">View Sessions</p>
            <p className="text-xl mb-12">
              Here is the list of the available sessions.
            </p>

            <SessionsTable
              data={sessionData}
              itemsPerPage={5}
              customHeaders={[
                'SESSION ID',
                'SESSION NAME',
                'DATE',
                'START TIME',
                'END TIME',
                'ORGANIZER',
                'MODE',
                '',
                '',
                '',
              ]}
            />
          </div>
        </Dashboard>
      )}
    </>
  )
}

export default AdminViewSessionsPage
