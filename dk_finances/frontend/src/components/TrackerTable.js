import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(category, subCategory, amount){
    return{category, subCategory, amount};
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

function TrackerTable(){
  const cleanedRow = [];
  const [rows, setRows] = React.useState([]);

  React.useEffect(()=>{fetch('api/history')
  .then(res=>{return res.json()})
  .then(data =>{setRows(data)})
  }, []);

  rows.map(cur=>{
    if(cur.user_id == 11){
      var sepPrice = cur.price.toLocaleString();
      cleanedRow.push(createData(cur.category, cur.subcategory, sepPrice))
    }
  })

  

   return(
       <TableContainer component={Paper} sx={{overflow: 'auto'}}>
           <Table sx={{minWidth: 700}}>
               <TableHead>
                   <TableRow>
                        <StyledTableCell>Category</StyledTableCell>
                        <StyledTableCell align="right">Sub-Category</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                {cleanedRow.map((row) => (
                  <StyledTableRow key={row.category}>
                    <StyledTableCell component='th' scope='row'>{row.category}</StyledTableCell>
                    <StyledTableCell align="right">{row.subCategory}</StyledTableCell>
                    <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  </StyledTableRow>
                ))}
               </TableBody>
           </Table>
       </TableContainer>
    )


}
export default TrackerTable;