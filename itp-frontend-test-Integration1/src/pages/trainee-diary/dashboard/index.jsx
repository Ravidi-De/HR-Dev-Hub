import { useEffect, useState } from 'react'
import './dashboard.scss'
import { Table } from './Table'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../../config'
import { Toast } from '../../../components/common'
import Swal from 'sweetalert2'

function TraineeDiaryDashboard() {
  const [rows, setRows] = useState([])
  const [rowToEdit, setRowToEdit] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axiosInstance
      .get('/tds/todo')
      .then((res) => {
        setRows(res.data)
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          return Toast('Cannot connect with the backend API.', 'error', {})
        }
        Toast(error.response.data.data, 'error', {})
      })
  }, [])

  const handleDeleteRow = (id, targetIndex) => {
    axiosInstance
      .delete(`/tds/todo/${id}`)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Todo deleted successfully.',
        })
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          return Toast('Cannot connect with the backend API.', 'error', {})
        }
        Toast(error.response.data.data, 'error', {})
      })

    setRows(rows.filter((_, idx) => idx !== targetIndex))
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredRows = rows.filter((currentTodo) =>
    currentTodo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="App">
      <p className="text-center text-5xl mb-8">Dashboard</p>
      <p className="text-center text-red-500 font-semibold text-xl mb-8">
        <Link to="/logout">Logout</Link>
      </p>
      <br />

      <div className="w-4/5 flex justify-end">
        <input
          type="search"
          id=""
          className="mb-4 block w-96 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Todo"
          onChange={handleSearchChange}
          required
        />
      </div>

      {(rows.length && (
        <Table
          rows={filteredRows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />
      )) || (
        <div className="text-center text-3xl text-gray-500">
          No todo available. Please add
        </div>
      )}
      <Link to="/trainee-diary/create" className="mt-8 text-3xl">
        Add Todo
      </Link>
    </div>
  )
}

export default TraineeDiaryDashboard
