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
function createData(date, category, subCategory, amount){
    return{date, category, subCategory, amount};
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


//Functional component for showing the daily spendings
function DailyList(props){
 
  //Acts as the placeholder for the modified data from the fetch method
  const createRows = [];

  //Store the fetched rows from the api
  const [rows, setRows] = React.useState([]);
  
  //Fetch from history table
  React.useEffect(()=>{fetch(`api/history?${props.user_id}`)
  .then(res=>{return res.json()})
  .then(data =>{setRows(data)})
  }, []);

  //Going through all values received and creating their corresponding data within the table
  rows.map(cur=>{
    const today = new Date();
    const date_bought = new Date(cur.date_bought)
    today.setHours(0, 0, 0, 0);
    date_bought.setHours(0, 0, 0, 0);
    if(today.getTime() == date_bought.getTime()){
      var sepPrice = cur.price.toLocaleString();
      createRows.push(createData(cur.date_bought, cur.category, cur.subcategory, sepPrice));
    };
  })

    return(
      <TableContainer component={Paper} sx={{maxHeight: 200 }}>
           <Table stickyHeader sx={{minWidth: 250}}>
               <TableHead>
                   <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell align="right">Category</StyledTableCell>
                        <StyledTableCell align="right">Sub-Category</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                   </TableRow>
               </TableHead>
               <TableBody>
                {createRows.map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell component='th' scope='row'>{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.category}</StyledTableCell>
                    <StyledTableCell align="right">{row.subCategory}</StyledTableCell>
                    <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  </StyledTableRow>
                ))}
               </TableBody>
           </Table>
       </TableContainer>
  );
    
}

export default DailyList;