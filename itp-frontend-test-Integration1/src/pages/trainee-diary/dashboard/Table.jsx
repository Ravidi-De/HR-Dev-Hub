import './table.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { formatDateFromTimestamp } from '../../../utils/time'

export const Table = ({ rows, deleteRow }) => {
  const navigate = useNavigate()

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Date</th>
            <th className="expand">Title</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{formatDateFromTimestamp(new Date(row.timestamp))}</td>
                <td className="expand">{row.title}</td>
                <td>
                  <span className={`label label-${row.type.toLowerCase()}`}>
                    {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-xl text-green-600 cursor-pointer mx-2 hover:scale-125"
                      onClick={() => navigate(`/trainee-diary/view/${row._id}`)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="text-xl text-danger cursor-pointer mx-2 hover:scale-125"
                      onClick={() => deleteRow(row._id, idx)}
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-xl text-primary mx-2 cursor-pointer hover:scale-125"
                      onClick={() => navigate(`/trainee-diary/edit/${row._id}`)}
                    />
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
