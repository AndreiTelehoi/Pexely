import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ImagesPage } from './images/ImagesPage'
import { FavoriteImages } from './favourites/FavoriteImages';
import { Button } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, currentUser, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box div={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  logOut: {
    marginTop: 10,
    position: 'absolute',
    right: 10
  }
}));

export default function MainPage({setUser, currentUser}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logOut = () => {
    setUser(null);
  }

  return (
    <div className={classes.root}>
    
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
        >
          <LinkTab label="Search" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Saved images" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <Button onClick={() => logOut()} className={classes.logOut} variant="contained" color="primary">
            Log out
        </Button>

      <TabPanel value={value} index={0}>
        <ImagesPage currentUser={currentUser}/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <FavoriteImages currentUser={currentUser}/>
      </TabPanel>
     
    </div>
  );
}