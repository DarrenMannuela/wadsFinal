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


function DailyList(props){
  const createRows = [];
  const [rows, setRows] = React.useState([]);

  React.useEffect(()=>{fetch(`api/history?${props.user_id}`)
  .then(res=>{return res.json()})
  .then(data =>{
      const today = new Date(); 
      today.setHours(0, 0, 0, 0);
      data.map(cur =>{
          const date_bought = new Date(cur.date_bought);
          date_bought.setHours(0, 0, 0, 0);
          if(today.getTime() == date_bought.getTime()){
            var sepPrice = cur.price.toLocaleString();
            createRows.push(createData(cur.category, cur.subcategory, sepPrice));
            setRows(createRows);
          };
    })
  })
  }, []);

  console.info(rows);

    return(
      <TableContainer component={Paper} sx={{maxHeight: 200 }}>
      <Table sx={{minWidth: 400}}>
          <TableHead>
              <TableRow>
                   <StyledTableCell>Category</StyledTableCell>
                   <StyledTableCell align="right">Sub-Category</StyledTableCell>
                   <StyledTableCell align="right">Amount</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.category}>
                  <StyledTableCell component='th' scope='row'>{row.category}</StyledTableCell>
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