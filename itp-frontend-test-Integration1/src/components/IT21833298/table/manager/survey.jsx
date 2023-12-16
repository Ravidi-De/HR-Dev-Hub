import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomSlider from '../../slider';

function createData(skill,T_rate,M_rate) {
  return { skill, T_rate, M_rate};
}


const rows = [
  createData('Technical Proficiency', (<CustomSlider/>), (<CustomSlider/>)),
  createData('Problem Solving', (<CustomSlider/>), (<CustomSlider/>)),
  createData('Communication Skills',(<CustomSlider/>), (<CustomSlider/>)),
  createData('Team Collaboration', (<CustomSlider/>), (<CustomSlider/>)),
  createData('Adaptability', (<CustomSlider/>), (<CustomSlider/>)),
  createData('Time Management', (<CustomSlider/>), (<CustomSlider/>)),
  createData('Creativity', (<CustomSlider/>), (<CustomSlider/>)),
  createData('Attention to Detail', (<CustomSlider/>), (<CustomSlider/>)),
];


const ManagerSurveyTable = () => {
  return (
    <TableContainer component={Paper}  className="w-fit">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="w-8">
          <TableRow >
            <TableCell></TableCell>
            <TableCell className="whitespace-pre bg-[#f3f4f6]">
              <div className="text-center text-xl">Trainee</div>
              <div className="tracking-[110px]">012345</div>
            </TableCell>
            <TableCell className="whitespace-pre">
              <div className="text-center text-xl">Manager</div>
              <div className="tracking-[110px]">012345</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.skill}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.skill}
              </TableCell>
              <TableCell className="bg-[#f3f4f6]">{row.T_rate}</TableCell>
              <TableCell>{row.M_rate}</TableCell>
    
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ManagerSurveyTable