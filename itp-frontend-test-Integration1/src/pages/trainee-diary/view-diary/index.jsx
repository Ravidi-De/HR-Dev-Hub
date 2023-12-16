import { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'
import { Toast } from '../../../components/common'
import { Link, useParams } from 'react-router-dom'
import { formatDateFromTimestamp } from '../../../utils/time'

function ViewDiary() {
  let { id } = useParams()
  const [todo, setTodo] = useState({})

  useEffect(() => {
    axiosInstance
      .get(`/tds/todo/${id}`)
      .then((res) => {
        setTodo(res.data)
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          return Toast('Cannot connect with the backend API.', 'error', {})
        }
        Toast(error.response.data.data, 'error', {})
      })
  }, [])

  const generatePdf = async () => {
    // PDF init
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const page = pdfDoc.addPage()

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { height } = firstPage.getSize()
    firstPage.drawText('Todo Details', {
      x: 50,
      y: height / 2 + 350,
      size: 30,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    })
    let y = 320

    const pdfFields = {
      Title: todo.title,
      TodoType: todo.type,
      Date: formatDateFromTimestamp(new Date(todo.timestamp)),
      Description: todo.desc,
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
    download(pdfBytes, `${pdfFields.Title}-todo.pdf`, 'application/pdf')
  }

  return (
    <>
      <p className="mt-16 mb-4 text-center text-5xl">View Details</p>
      <p className="text-center text-xl">
        <Link to="/trainee-diary/dashboard">&#x3C; Back</Link>
      </p>
      <img
        className="w-80 block mx-auto my-8"
        src="/static/illustrations/Intern-Login.svg"
        alt="illustration"
      />

      <div className="content">
        <p className="text-3xl text-center mb-6">
          Record Identifier: {todo._id}
        </p>
        <p className="text-3xl text-center mb-6">Title: {todo.title}</p>
        <p className="text-3xl text-center mb-6">Type: {todo.type}</p>
        <p className="text-3xl text-center mb-6">
          Created Date: {formatDateFromTimestamp(new Date(todo.timestamp))}
        </p>
        <p className="mt-6 mb-3 text-3xl text-center">Description</p>
        <textarea
          id="message"
          rows="4"
          className="cursor-not-allowed block mx-auto p-2.5 w-full lg:w-1/2 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          disabled={true}
          value={todo.desc}
        ></textarea>
        <br />
        <br />
        <br />

        <button
          onClick={generatePdf}
          className="z-50 text-3xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-2 block mx-auto"
        >
          Generate PDF
        </button>
        <br />
        <br />
        <br />
      </div>
    </>
  )
}

export default ViewDiary
