import React from 'react'
import { Grid, Paper, Button, Slider, Select } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { FrequencySelector } from './FrequencySelector'
import { FrequencySlider } from './FrequencySlider'
import { Volume } from '../../components/Volume'
import { Pan } from '../../components/Pan'
import { Play } from '../../components/Play'
import { OscillatorType } from '../../components/OscillatorType'

export const StaticPlayer = (props) => {

  const { createNodePromise, deleteOscillator, oscillatorNodes, changeOscillatorType, changeVolume, muteAll, changePan, frequency, changeFrequency, overtonePreset, playPauseWrapper, playing } = props
  return (
    <div>
      <div className="oscillator-control-container">
      <Grid container justify='flex-start'  spacing={3}>
        <Grid item >
          <Button
            onClick={() => createNodePromise()}
            className="green-btn"
            variant="contained"
          >
            Create New Oscillator
         </Button>
         </Grid>
         <Grid item >
         <Button
          onClick={() => muteAll()}
          color="secondary"
          variant="contained"
         >
           Mute All
         </Button>
         </Grid>
         <Grid item>
         <div className="field-label">Choose An Overtone Preset</div>
           <Select
            native
            onChange={(e)=>overtonePreset(e)}
           >
             <option>Select a Preset</option>
            <option>1 - 3 - 5</option>
            <option>1 - 3 - 5 - 8</option>
           </Select>
         </Grid>
      </Grid>
      </div>
      {oscillatorNodes.map((node, i) => (
        <Paper key={i} elevation={3} className="oscillator-container">
          <Grid container spacing={1} justify="flex-end">
            <Grid item key={`remove-${i}`}>
                <Button onClick={() => deleteOscillator(i)}>
                  <HighlightOffIcon></HighlightOffIcon>
                </Button>
              </Grid>
            </Grid>
          <Grid container spacing={6} justify="center" alignItems="center">
            <Grid item xs={6} md={2} key={`play-${i}`} className="play-container">
              <Play oscillatorNodes={oscillatorNodes} playPauseWrapper={playPauseWrapper} playing={playing} i={i} />
            </Grid>
            <Grid item xs={6} md={2} key={`type-${i}`} className="play-container">
              <OscillatorType oscillatorNodes={oscillatorNodes} changeOscillatorType={(e, value) => changeOscillatorType(e, value, i)} i={i} />
            </Grid>
            <Grid item xs={5} md={3} key={`volume-${i}`}>
              <Volume oscillatorNodes={oscillatorNodes} changeVolume={changeVolume} i={i} />
            </Grid>
            <Grid item xs={5} md={3} key={`pan-${i}`}>
              <Pan oscillatorNodes={oscillatorNodes} changePan={changePan} i={i} />
            </Grid>
          <Grid container justify="center">
            <Grid item  xs={9}>
              <FrequencySlider key={`frequency-${i}`} oscillatorNodes={oscillatorNodes} i={i} changeFrequency={changeFrequency} />
            </Grid>
          </Grid>
          <Grid item  xs={12}>
            <FrequencySelector key={`selector-${i}`} frequency={frequency} oscillatorIndex={i} changeFrequency={(e, value) => changeFrequency(e, value, i)} />
          </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )
}


