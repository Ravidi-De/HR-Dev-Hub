import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { axiosInstance } from '../../../../config'
import Swal from 'sweetalert2'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs'
import StarRating from '../../rating'

// function generateStars(value) {
//   const starCount = Math.round(value)
//   return '*'.repeat(starCount)
// }

export default function ReviewedTable({ data }) {
  const [searchText, setSearchText] = useState('')

  const downloadPDF = async (id) => {
    // PDF init
    const pdfDoc = await PDFDocument.create()
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const page = pdfDoc.addPage()

    axiosInstance.get(`/sms/survey/${id}`).then(async (res) => {
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { height } = firstPage.getSize()
      firstPage.drawText('Skill Report', {
        x: 50,
        y: height / 2 + 350,
        size: 30,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })

      let y = 320

      const {
        TechnicalProficiency,
        CommunicationSkills,
        TeamCollaboration,
        Adaptability,
        TimeManagement,
        Creativity,
        AttentiontoDetail,
      } = res.data

      const technicalProfM = (TechnicalProficiency.manager * 80) / 100
      const technicalProfT = (TechnicalProficiency.intern * 20) / 100

      const communicationM = (CommunicationSkills.manager * 80) / 100
      const communicationT = (CommunicationSkills.intern * 20) / 100

      const TeanCollM = (TeamCollaboration.manager * 80) / 100
      const TeanCollT = (TeamCollaboration.intern * 20) / 100

      const AdaptabilityM = (Adaptability.manager * 80) / 100
      const AdaptabilityT = (Adaptability.intern * 20) / 100

      const TimeManagementM = (TimeManagement.manager * 80) / 100
      const TimeManagementT = (TimeManagement.intern * 20) / 100

      const CreativityM = (Creativity.manager * 80) / 100
      const CreativityT = (Creativity.intern * 20) / 100

      const AttentionM = (AttentiontoDetail.manager * 80) / 100
      const AttentionT = (AttentiontoDetail.intern * 20) / 100

      const pdfFields = {
        TraineeID: res.data.TraineeID,
        TraineeName: res.data.TraineeName,
        Description: res.data.Description,
        TechnicalProficiency: technicalProfM + technicalProfT,
        CommunicationSkills: communicationM + communicationT,
        TeamCollaboration: TeanCollM + TeanCollT,
        Adaptability: AdaptabilityM + AdaptabilityT,
        TimeManagement: TimeManagementM + TimeManagementT,
        Creativity: CreativityM + CreativityT,
        AttentiontoDetail: AttentionM + AttentionT,
      }

      Object.entries(pdfFields).forEach(([key, value]) => {
        console.log(key)
        if (
          key === 'TraineeID' ||
          key === 'TraineeName' ||
          key === 'Description'
        ) {
          page.drawText(`${key}: ${value}`, {
            x: 50,
            y: y / 2 + 550,
            size: 12,
            color: rgb(0, 0, 0),
          })
        } else {
          page.drawText(`${key}: ${value + '%'}`, {
            x: 50,
            y: y / 2 + 550,
            size: 12,
            color: rgb(0, 0, 0),
          })
        }

        // Object.entries(pdfFields).forEach(([key, value]) => {
        //   let textToDraw = `${key}: `

        //   if (
        //     key === 'TraineeID' ||
        //     key === 'TraineeName' ||
        //     key === 'Description'
        //   ) {
        //     page.drawText(textToDraw, {
        //       x: 50,
        //       y: y / 2 + 550,
        //       size: 12,
        //       color: rgb(0, 0, 0),
        //     })
        //     textToDraw += value
        //   } else {
        //     page.drawText(textToDraw, {
        //       x: 50,
        //       y: y / 2 + 550,
        //       size: 12,
        //       color: rgb(0, 0, 0),
        //     })
        //     const stars = <StarRating value={value} />
        //     // const starsCount = Math.round(parseFloat(value))
        //     // const stars = '⭐'.repeat(starsCount)
        //     textToDraw += stars
        //   }

        //   page.drawText(textToDraw, {
        //     x: 50,
        //     y: y / 2 + 550,
        //     size: 12,
        //     color: rgb(0, 0, 0),
        //   })

        y -= 75
      })

      const pdfBytes = await pdfDoc.save()
      download(
        pdfBytes,
        `${pdfFields.TraineeID}-SkillReport.pdf`,
        'application/pdf'
      )
    })
  }

  const deleteSurvey = (_id) => {
    // Delete survey func
    axiosInstance.delete(`/sms/survey/${_id}`).then((res) => {
      if (res.status === 200) {
        const data = rows.filter((survey) => survey._id !== _id)

        setRows(data)

        return Swal.fire({
          title: 'Report Cancelled',
          text: res.data.data,
          icon: 'success',
          button: 'Ok',
        })
      }
    })
  }

  // Define onDownload Component
  const onDownload = (_id) => (
    <button
      onClick={() => downloadPDF(_id)}
      className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto"
    >
      Download PDF
    </button>
  )

  // Write the onDelete component
  const deletePdf = (_id) => (
    <button
      onClick={() => deleteSurvey(_id)}
      className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto"
    >
      Delete
    </button>
  )

  // Remove onEdit()
  const updatedRows = data.map((item) => {
    const { onEdit, _id, ...rest } = item
    rest.onDownload = onDownload(_id)
    rest.deletePdf = deletePdf(_id)
    return rest
  })
  console.log(updatedRows)
  const [rows, setRows] = useState(updatedRows)

  const handleSearchChange = (event) => {
    const searchInput = event.target.value
    setSearchText(searchInput)

    // Filter the rows based on the search input
    const filteredRows = updatedRows.filter((row) =>
      row.TraineeID.toLowerCase().includes(searchInput.toLowerCase())
    )

    const updated = filteredRows.map((item) => {
      const { onEdit, _id, ...rest } = item
      return rest
    })
    setRows(updated)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search TraineeID..."
        value={searchText}
        onChange={handleSearchChange}
        className="px-3 py-2 border rounded-md mb-4"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="p-5">
              <TableCell align="center">TraineeID</TableCell>
              <TableCell align="center" className="w-3/4">
                Trainee Name
              </TableCell>
              <TableCell align="center" className="w-40px">
                Download PDF
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.keys(row).map((key) =>
                    row[key] &&
                    key !== 'IsReviewed' &&
                    key !== 'Description' &&
                    row['IsReviewed'] == true ? (
                      <TableCell key={key} align="center">
                        {typeof row[key] === 'function' ? row[key]() : row[key]}
                      </TableCell>
                    ) : null
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
