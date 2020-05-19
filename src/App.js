import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { StaticController } from './Screens/StaticPitches/StaticController'
import { SeriesController } from './Screens/PitchSeries/SeriesController'


const activeStyle = {
  color: 'red'
} 

function App() {
  return (
    <Router>
      <div className="App">
        <header 
          className="header"
        >
        Welcome to Ben's Pitch Thingy
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

        <Switch>
        <Route path="/series">
            <SeriesController />
          </Route>
          <Route path="/">
            <StaticController />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
