import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(dateAdded, income){
    return{dateAdded, income};
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function BalanceTable(props){
  const cleanedRow = [];
  const [rows, setRows] = React.useState([]);

  React.useEffect(()=>{fetch(`api/incomes?${props.user_id}`)
  .then(res=>{return res.json()})
  .then(data =>{setRows(data)})
  }, []);

  rows.map(cur=>{
    var sepPrice = cur.income.toLocaleString();
    cleanedRow.push(createData(cur.date_added, sepPrice))
    
  })

  

   return(
       <TableContainer component={Paper} sx={{maxHeight: 100 }}>
           <Table stickyHeader sx={{minWidth: 200}}>
               <TableHead>
                   <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell align="right">Income</StyledTableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                {cleanedRow.map((row) => (
                  <StyledTableRow key={row.dateAdded}>
                    <StyledTableCell component='th' scope='row'>{row.dateAdded}</StyledTableCell>
                    <StyledTableCell align="right">{row.income}</StyledTableCell>
                  </StyledTableRow>
                ))}
               </TableBody>
           </Table>
       </TableContainer>
    )


}
export default BalanceTable;