import React from 'react';
import './css/App.css';
import StaticToneGenerator from './components/StaticToneGenerator'
import DynamicToneGenerator from './components/DynamicToneGenerator'
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

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
                to="/dynamic"
                activeStyle={activeStyle}
                >
                  Pitch Series
                </NavLink>
              </li>
            </ul>
          </nav>

        <Switch>
          <Route path="/dynamic">
            <DynamicToneGenerator />
          </Route>
          <Route path="/">
            <StaticToneGenerator />
          </Route>
        </Switch>


        </div>
    </Router>

  );
}

export default App;
