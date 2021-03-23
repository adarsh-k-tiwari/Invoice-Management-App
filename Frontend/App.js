import React from 'react';
import './App.css';
import theme from '../src/utils/theme';
import { makeStyles } from '@material-ui/core';
import CollectorDashboard from '../src/views/CollectorDashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROLL_NUMBER } from '../src/utils/constants';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  mainBackground: {
    background: theme.palette.primary.mainGradient,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));
const App = () => {
  console.log('theme', theme);
  const classes = useStyles();
  return (
    <div className={classes.mainBackground}>
      <Router basename={`/${ROLL_NUMBER}`}>
        <Route exact path="/" component={CollectorDashboard} />
      </Router>
    </div>
  );
};

export default App;
