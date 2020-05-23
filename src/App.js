import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { StaticController } from './Screens/StaticPitches/StaticController'
import { SeriesController } from './Screens/PitchSeries/SeriesController'
import { Grid } from '@material-ui/core'


const activeStyle = {
  color: 'red'
} 

function App() {
  return (
    <Router forceRefresh={true}>
      <div className="App">
        <header 
          className="header"
        >
        PITCH GENERATOR
        </header>
          <nav className="nav">
            <ul className='nav-container'>
              <li className='nav-li'>
                <NavLink 
                className='nav-link'
                exact={true}
                to="/"
                activeStyle={activeStyle}
                >
                  Static Pitches
                </NavLink>
              </li>
              <li className='nav-li'>
                <NavLink 
                className='nav-link'
                to="/series"
                activeStyle={activeStyle}
                >
                  Pitch Series
                </NavLink>
              </li>             
            </ul>
          </nav>
          <Grid container justify="center">
            <Grid item xs={11} lg={10}>
              <Switch>
              <Route path="/series">
                  <SeriesController />
                </Route>
                <Route path="/">
                  <StaticController />
                </Route>
              </Switch>
            </Grid>
          </Grid>
      </div>
    </Router>
  );
}

export default App;
