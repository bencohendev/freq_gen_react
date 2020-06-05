import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { StaticController } from './Screens/StaticPitches/StaticController'
import { SeriesController } from './Screens/PitchSeries/SeriesController'
import { Grid } from '@material-ui/core'

const activeStyle = {
  color: 'red'
} 

function App() {

  const context = new (window.AudioContext || window.webkitAudioContext)()

  const [pitchArray, setPitchArray] = useState([])

  const populateAllPitches = () => {
    let fundamentalPitches = [32.703, 34.648, 36.708, 38.891, 41.203, 43.454, 46.249, 48.999, 51.913, 55, 58.270, 61.735]
    const pitchNames = ['c' , 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
    let allPitches = []
    let pitchMultiplier = 1

    for(let i=1; i<=9; i++) {
        for(let j=0; j<=fundamentalPitches.length-1; j++){         
            allPitches.push({pitch: pitchNames[j]+i, frequency: fundamentalPitches[j]*pitchMultiplier})
        }
        pitchMultiplier = pitchMultiplier*2
    }
    setPitchArray(allPitches)
  }

  useEffect(populateAllPitches, [])




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
                  <SeriesController context={context} pitchArray={pitchArray} />
                </Route>
                <Route path="/">
                  <StaticController context={context} pitchArray={pitchArray} />
                </Route>
              </Switch>
            </Grid>
          </Grid>
      </div>
    </Router>
  );
}

export default App;
