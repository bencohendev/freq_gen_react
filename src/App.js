import React from 'react';
import './css/App.css';
import StaticToneGenerator from './components/StaticToneGenerator'
import DynamicToneGenerator from './components/DynamicToneGenerator'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header 
          className="header"
        >
        Welcome to Ben's Pitch Thingy
        </header>
          <nav>
            <ul>
              <li>
                <Link to="/">Static Pitches</Link>
              </li>
              <li>
                <Link to="/dynamic">Pitch Series</Link>
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
    // <div className="App">

    // </div>
  );
}

export default App;
