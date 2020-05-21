import React from 'react';
import '../../App.css'
import { Button, Popper, Paper } from '@material-ui/core';


const FrequencySelector = (props) => {
  const pitches = [32.703, 34.648, 36.708, 38.891, 41.203, 43.454, 46.249, 48.999, 51.913, 55, 58.270, 61.735]
  const pitchNames = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
  const { changeFrequency, oscillatorIndex } = props

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  return (
    <React.Fragment>
      <div className="pitch-select-btn">
      <Button aria-describedby={id} variant="contained" onClick={handleClick} >
        Select a Pitch
      </Button>
      </div>
      <Popper id={id} open={open} placement="bottom" anchorEl={anchorEl}>
        <Paper elevation={5}>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"
                  className="pitch-btn"
                  key={i}
                  onClick={(e) =>changeFrequency(pitch, oscillatorIndex)}
                >
                  {pitchNames[i]}1
                </Button>
              ))
            }
          </div>

          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) =>changeFrequency(pitch*2, oscillatorIndex)}
                >
                  {pitchNames[i]}2
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 4, oscillatorIndex)}
                >
                  {pitchNames[i]}3
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 8, oscillatorIndex)}
                >
                  {pitchNames[i]}4
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 16, oscillatorIndex)}
                >
                  {pitchNames[i]}5
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 32, oscillatorIndex)}
                >
                  {pitchNames[i]}6
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 64, oscillatorIndex)}
                >
                  {pitchNames[i]}7
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 128, oscillatorIndex)}
                >
                  {pitchNames[i]}8
                </Button>
              ))
            }
          </div>
          <div className='pitch-row'>
            {
              pitches.map((pitch, i) => (
                <Button
                  variant="outlined"

                  className="pitch-btn"

                  key={i}
                  onClick={(e) => changeFrequency(pitch * 256, oscillatorIndex)}
                >
                  {pitchNames[i]}9
                </Button>
              ))
            }
          </div>
        </Paper>
      </Popper>
    </React.Fragment>
  )
}



export default FrequencySelector