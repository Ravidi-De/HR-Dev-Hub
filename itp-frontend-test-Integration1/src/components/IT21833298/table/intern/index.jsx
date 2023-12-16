import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CustomSlider from '../../slider'

const BasicTable = ({ values, handleChange, tableTypes, isDisabled }) => {
  return (
    <div className="w-2/3">
      <TableContainer className="w-fit" component={Paper}>
        <Table sx={{ minWidth: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className="whitespace-pre tracking-[110px]">
                012345
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableTypes.map((typeObj) => (
              <TableRow
                key={typeObj.type}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {typeObj.type}
                </TableCell>
                <TableCell>
                  <CustomSlider
                    value={values[typeObj.type]}
                    name={typeObj.display}
                    handleChange={handleChange}
                    type={typeObj.type}
                    id={typeObj.id}
                    isDisabled={isDisabled}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BasicTable
