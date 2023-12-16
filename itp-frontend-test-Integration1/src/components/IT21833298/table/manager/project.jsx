import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(TraineeId, Description, Survey) {
  return { TraineeId, Description, Survey };
}

const initialRows = [
  createData('IT218272', 'coding....', ( <a
    href="/path-to-your-pdf-file.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-full inline-block"
  >
    Download PDF
  </a>
  
  )),
  createData('IT213234', 'coding....', (
    <a
    href="/path-to-your-pdf-file.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-full inline-block"
  >
    Download PDF
  </a>
  
  )),
  createData('IT213232', 'coding....', ( 
  <a
    href="/path-to-your-pdf-file.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-full inline-block"
  >
    Download PDF
  </a>
  
  )),  
  createData('IT254242', 'coding....',(
  <a
    href="/path-to-your-pdf-file.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-full inline-block"
  >
    Download PDF
  </a>
  
  )),
  createData('IT218742', 'coding....', (
  <a
    href="/path-to-your-pdf-file.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-full inline-block"
  >
    Download PDF
  </a>
  
  )),
];

export default function Project() {
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(initialRows);

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchText(searchInput);

    // Filter the rows based on the search input
    const filteredRows = initialRows.filter((row) =>
      row.TraineeId.toLowerCase().includes(searchInput.toLowerCase())
    );

    setRows(filteredRows);
  };

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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.TraineeId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.TraineeId}
                </TableCell>
                <TableCell align="center">{row.Description}</TableCell>
                <TableCell align="center">{row.Survey}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
