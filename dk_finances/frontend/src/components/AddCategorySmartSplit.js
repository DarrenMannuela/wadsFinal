import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import TextField  from '@mui/material/TextField';
import  Box  from '@mui/material/Box';
import BudgetAmountDisplay from './BudgetAmountDisplay';
import Grid from '@mui/material/Grid';
import BudgetPieChart from './BudgetPieChart';



const options = ["Food", "Transportation", "Travel", 
                            "Housing", "Utility bills", "Cellphone", 
                            "Groceries", "Clothing", "Healthcare",
                            "Childcare", "Pet Necessities", "Pet Insurance",
                            "Subscriptions", "Others"]

function AddCategorySmartSplit(props){

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [needWant, setNeedWant] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [updateData, setUpdateData] = React.useState(false)

    const handleNeedsWants = (event) =>{
       setNeedWant(event.target.value)
    };

    const handleCategory = (event) => {
        setCategory(event.target.value)
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleAmount = (event) =>{
        setAmount(event.target.valueAsNumber);
        console.info(amount);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    async function postAmount(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        fetch(`api/create-history`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: needWant,
                subcategory: category,
                price: amount,
                date_bought: today,
                user_id: 11
            }),           
        })
        .then((res) => {console.info(res.status);
            res.json();}).then(()=>{
                setNeedWant('');
                setCategory('');
                setAmount(0);
                setUpdateData(true);
            })
        .catch((err) => console.log('error: ', err))

    }


    return (
    <Box component='form' rowSpacing={2} sx={{display:'flex'}}>
        <Grid container direction="row" sx={{mt:'15%'}}>
            <Grid item xs={8}>
                <BudgetPieChart user_id = {11} updateData={updateData}/>
            </Grid>
            <Grid item xs={4}>
                <Paper elevation={12} sx={{width: 350, height: 350 }}>
                    <React.Fragment>
                        <ButtonGroup disableElevation variant="contained" sx={{ml: 3, mt: 5, width: 300, height: 40}}>
                            <Button id='needs' name='needs' value="Needs" onClick={handleNeedsWants} onChange={needWant} sx={{width: "50%"}}>Needs</Button>
                            <Button id='wants' name='wants' value="Wants" onClick={handleNeedsWants} onChange={needWant} sx={{width: "50%"}}>Wants</Button>
                        </ButtonGroup>

                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" sx={{ml: 3, mt: 2, width: 300, height: 40}}>
                            <Button onClick={handleCategory} onChange={category} value={options[selectedIndex]} disabled={!needWant} sx={{width:"80%"}}>{options[selectedIndex]}</Button>
                            <Button
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                            disabled={!needWant}
                            sx={{width:"20%"}}
                            >
                            <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper sx={{overflow: 'auto', width: 300, height: 100}}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                        {option}
                                        </MenuItem>
                                    ))}
                                    </MenuList>
                                </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                        </Popper>
                    </React.Fragment>
                    <Divider variant="middle" sx={{mt: 2, borderBottomWidth: 5}}/>

                    <BudgetAmountDisplay needWant = {needWant} category={category}/>
                    <Box  sx={{px: 3, mt: 2}}>
                    <TextField
                            required
                            fullWidth
                            autoFocus
                            name="amount"
                            id="amount"
                            label="Amount"
                            type="number"
                            variant="filled"
                            defaultValue={0}
                            onChange = {handleAmount}
                            disabled = {!category}
                            >
                    </TextField>
                    </Box>
                    <Button 
                            fullWidth
                            disabled={!amount}
                            id = "addAmount"
                            variant="contained"
                            sx={{ mt: 3, mb: 2}}
                            onClick={postAmount}
                            >
                            Add
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    </Box>  
    );  

}

export default AddCategorySmartSplit;
