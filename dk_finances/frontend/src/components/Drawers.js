import * as React from 'react';
import { Link, useLocation } from "react-router-dom"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

//The size of the drawer width
const drawerWidth = 240;

//Creates an Appbar to access the tool bar  
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  //Setting the themes and transition for the action when the appbar is open and closing
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    //Setting the themes and transition for the action when the appbar is closed and opening
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Setting the structure of the drawer 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

//Functional component for Drawers
function Drawers(props) {
  //Gets store the mui useTheme to use on the drawer
  const theme = useTheme();

  //keeps track whether the drawer is open or not
  const [open, setOpen] = React.useState(false);

  //Stores the users savings, needs and wants
  const [savings, setSavings] = React.useState(null);
  const [needs, setNeeds] = React.useState(null);
  const [wants, setWants] = React.useState(null);

  //Stores both path and its corresponding page name in two seperate objects
  const paths = { 'Dashboard': '/', 'Smart Split': '/smartsplit', 'Tracker': '/tracker', 'Add Income': '/addincome' }
  const page = { '/': 'Dashboard', '/smartsplit': 'Smart Split', '/tracker': 'Tracker', '/addincome': 'Add Income' }

  //Fetches from the budegt allocation table
  React.useEffect(() => {
    const fetchBudget = async () => {
      await fetch('api/get-budget-allocation', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.token}`
        },
      })
        .then(res => { return res.json() })
        .then(data => {
          var sepSavings = data.savings.toLocaleString();
          var sepNeeds = data.needs.toLocaleString();
          var sepWants = data.wants.toLocaleString();
          setSavings(sepSavings);
          setNeeds(sepNeeds);
          setWants(sepWants);
        })
    }
    if (props.token) {
      fetchBudget();
    }
  }, [props.token]);

  //Handles the opening of the Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  //Handles the closing of the Drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Gets the current page the user is on based on the url path
  function handleCurPage() {
    const location = useLocation();
    return (page[location.pathname])
  }




  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {handleCurPage()}
          </Typography>

          <Typography variant="h6" noWrap component="div" sx={{ ml: "15%", mr: "5%", fontSize: 18 }}>
            {`Savings: Rp-${savings}`}
          </Typography>

          <Typography variant="h6" noWrap component="div" sx={{ mx: "5%", fontSize: 18 }}>
            {`Needs: Rp-${needs}`}
          </Typography>

          <Typography variant="h6" noWrap component="div" sx={{ mx: "5%", fontSize: 18 }}>
            {`Wants: Rp-${wants}`}
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Smart Split', 'Tracker', 'Add Income'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={paths[text]}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 5, mx: '2%', width: 180 }}
              onClick={props.logout}
            >
              Logout
            </Button>
          </Box>
        </List>
      </Drawer>
    </Box>
  );
}

export default Drawers;
