import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


//Creates the data held within the table
function createData(dateAdded, income){
    return{dateAdded, income};
}

//Styles the table header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //black colored cell header and for the font to have the color white
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    //sets the fontsize of table content to 14
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

//Styles the tabel rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


//Functional component for the balance table
function BalanceTable(props){
  //Acts as the placeholder for the modified data from the fetch method
  const cleanedRow = [];

  //Store the fetched rows from the api
  const [rows, setRows] = React.useState([]);

  //Fetches from the incomes table
  React.useEffect(()=>{fetch(`api/incomes?${props.user_id}`)
  .then(res=>{return res.json()})
  .then(data =>{setRows(data)})
  }, []);

  //Going through all values received and creating their corresponding data within the table
  rows.map(cur=>{
    const monthNow = new Date(cur.date_added).getMonth(); 
    const monthData = new Date().getMonth();
    if(monthData == monthNow){
    var sepPrice = cur.income.toLocaleString();
    cleanedRow.push(createData(cur.date_added, sepPrice))
    }
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