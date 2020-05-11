import React from 'react';
import './css/App.css';
import StaticToneGenerator from './components/StaticToneGenerator'
import DynamicToneGenerator from './components/DynamicToneGenerator'

function App() {
  return (
    <div className="App">
      <header 
        className="header"
      >
      Welcome to Ben's Pitch Thingy
      </header>
  {/*<StaticToneGenerator />*/}
      <DynamicToneGenerator />
    </div>
  );
}

export default App;
