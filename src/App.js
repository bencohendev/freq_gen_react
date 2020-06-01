import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { StaticController } from './Screens/StaticPitches/StaticController'
import { SeriesController } from './Screens/PitchSeries/SeriesController'
import { Grid } from '@material-ui/core'

import { AudioContext } from './contexts/AudioContext'


const activeStyle = {
  color: 'red'
} 

function App() {

  const context = new (window.AudioContext || window.webkitAudioContext)()
  const masterGainNode = context.createGain()
  const suspendContext = context.suspend()
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


//creates a new oscillator node
const createNode = (freq) => {

  const oscillatorNode = context.createOscillator();
  //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
  const oscillatorGainNode = context.createGain()
  const onOffNode = context.createGain()
  const panNode = context.createPanner()

  //initialize node values
  oscillatorGainNode.gain.setValueAtTime(.5, context.currentTime)
  onOffNode.gain.setValueAtTime(0, context.currentTime)      
  panNode.panningModel = 'equalpower'
  panNode.setPosition(0, 0, 0)

  //connect node chain
  oscillatorNode.connect(oscillatorGainNode)
  oscillatorGainNode.connect(onOffNode)   
  onOffNode.connect(panNode)
  panNode.connect(context.destination)

  oscillatorNode.start()

  oscillatorNode.frequency.setValueAtTime(freq, context.currentTime)


  //saves oscillator values as object that can be manipulated later
  const oscillatorNodeValues = {
    oscillatorNode: oscillatorNode,
    onOffNode: onOffNode,
    oscillatorGainNode: oscillatorGainNode,
    oscillatorPanNode: panNode,
    frequency: freq,
    type: oscillatorNode.type,
    gain: 50,
    pan: 0,
    playing: 'Play',
}
return oscillatorNodeValues
}

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
                  <SeriesController context={context}/>
                </Route>
                <Route path="/">
                  <StaticController context={context} pitchArray={pitchArray} createNode={createNode}/>
                </Route>
              </Switch>
            </Grid>
          </Grid>
      </div>
    </Router>
  );
}

export default App;
