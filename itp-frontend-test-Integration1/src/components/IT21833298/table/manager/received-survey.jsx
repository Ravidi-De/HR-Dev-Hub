import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Swal from 'sweetalert2'
import { axiosInstance } from '../../../../config'

export default function ReceivedTable({ data }) {
  const [searchText, setSearchText] = useState('')
  const [rows, setRows] = useState(data)
  console.log(data)

  const deleteButton = (_id) => (
    <button
      onClick={() => onDelete(_id)}
      className="z-50 text-base border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-4 py-1 block mx-auto"
    >
      Delete
    </button>
  )

  const onDelete = (_id) => {
    // Delete survey func
    axiosInstance.delete(`/sms/survey/${_id}`).then((res) => {
      if (res.status === 200) {
        const data = rows.filter((survey) => survey._id !== _id)

        setRows(data)

        return Swal.fire({
          title: 'Survey Cancelled',
          text: res.data.data,
          icon: 'success',
          button: 'Ok',
        })
      }
    })
  }

  const handleSearchChange = (event) => {
    const searchInput = event.target.value
    setSearchText(searchInput)

    // Filter the rows based on the search input
    const filteredRows = data.filter((row) =>
      row.TraineeID.toLowerCase().includes(searchInput.toLowerCase())
    )
    setRows(filteredRows)
  }

  const datasetWithDelete = Array.isArray(rows)
    ? rows.map((item) => {
        return {
          ...item,
          deleteButton: () => deleteButton(item._id),
        }
      })
    : []

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
                Description
              </TableCell>
              <TableCell align="center">Survey</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasetWithDelete.length > 0
              ? datasetWithDelete.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.keys(row).map((key) =>
                      row[key] &&
                      key !== 'TraineeName' &&
                      key !== '_id' &&
                      row['IsReviewed'] == false ? (
                        <TableCell key={key} align="center">
                          {typeof row[key] === 'function'
                            ? row[key]()
                            : row[key]}
                        </TableCell>
                      ) : null
                    )}
                  </TableRow>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
