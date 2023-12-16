import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressBook,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { Dashboard } from '../../../../components/common'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'
import { axiosInstance } from '../../../../config'
import { time24hAdjust, timeAdjust } from '../../../../utils/time'

const QEViewExam = () => {
  let { id } = useParams()
  const [examData, setExamData] = useState({})

  useEffect(() => {
    document.title = 'Training Schedule Management Admin Dashboard'

    axiosInstance.get(`/ipm/exam/${id}`).then((res) => {
      setExamData(res.data)
    })
  }, [])

  const generatePdf = async (id) => {
    console.log(examData)
    // PDF init
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const page = pdfDoc.addPage()

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { height } = firstPage.getSize()
    firstPage.drawText('Final Exam', {
      x: 50,
      y: height / 2 + 350,
      size: 30,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    })
    let y = 320

    const pdfFields = {
      ExamType: examData.ExamType,
      InvigilatorEmpID: examData.InvigilatorEmpID,
      Location: examData.Location,
      StartTime: time24hAdjust(examData.StartTimestamp),
      EndTime: time24hAdjust(examData.EndTimestamp),
      Materials: examData.Materials,
      Questions: examData.Questions,
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
      `${pdfFields.ExamType}-Final-Paper.pdf`,
      'application/pdf'
    )
  }

  return (
    <Dashboard
      sectionLinks={[
        {
          section: 'Options',
          children: [
            {
              path: '/inline-product-mgt/QE/create-exam',
              name: 'Create Exam Paper',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faAddressBook}
                />
              ),
            },
            {
              path: '/inline-product-mgt/QE/evaluate',
              name: 'Evaluate Exam Papers',
              icon: () => (
                <FontAwesomeIcon
                  className="mr-4 text-3xl text-gray-300"
                  icon={faMagnifyingGlass}
                />
              ),
            },
            {
              path: '/inline-product-mgt/QE/Dashboard',
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
      <div className="block mt-6 p-8">
        <p className="text-3xl">Exam &#x3E; {examData.ExamType}</p>
      </div>

      <div className="block p-8">
        <p className="mb-4">
          <span className="font-semibold">Session ID:</span> {examData._id}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Invigilator Employee ID: </span>
          {examData.InvigilatorEmpID}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Location:</span> {examData.Location}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Date:</span>{' '}
          {new Date(examData.StartTimestamp).toDateString()}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Start Time:</span>{' '}
          {timeAdjust(examData.StartTimestamp)}
        </p>
        <p className="mb-6">
          <span className="font-semibold">End Time:</span>{' '}
          {timeAdjust(examData.EndTimestamp)}
        </p>

        <div className="block">
          <p className="mb-4">
            <span className="font-semibold">Materials:</span>
          </p>
          <textarea
            className="mb-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            disabled={true}
            value={examData.Materials}
          ></textarea>
        </div>

        <div className="block">
          <p className="mb-4">
            <span className="font-semibold">Questions:</span>
          </p>
          <textarea
            className="mb-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            disabled={true}
            value={examData.Questions}
          ></textarea>
        </div>

        {/* Interns */}
        <p className="mb-4">
          <span className="font-semibold">Participants:</span>
        </p>
        {examData.participantEmails && examData.participantEmails.length > 0 ? (
          examData.participantEmails.map((participant) => (
            <p key={participant.email} className="mb-1">
              {participant.email}
            </p>
          ))
        ) : (
          <p>No participants found</p>
        )}
      </div>
      <br />
      <button
        onClick={() => generatePdf(id)}
        className="z-50 text-2xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-2 block mx-auto"
      >
        Export PDF
      </button>
      <br />
      <br />
    </Dashboard>
  )
}

export default QEViewExam
