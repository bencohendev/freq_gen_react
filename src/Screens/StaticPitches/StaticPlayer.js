import React from 'react'
import { Grid, Paper, Button, Slider } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FrequencySelector from './FrequencySelector'
import FrequencySlider from './FrequencySlider'
import { Volume } from '../../components/Volume'
import { Play } from '../../components/Play'
import { OscillatorType } from '../../components/OscillatorType'


export const StaticPlayer = (props) => {

  const { createNode, deleteOscillator, oscillatorNodes, changeOscillatorType, changeVolume, changePan, frequency, changeFrequency, playPauseWrapper, playing } = props
  return (
    <div className="main">
      <Grid>
        <div className="create-oscillator-btn">
          <Button
            onClick={() => createNode()}
            color="secondary"
            variant="contained"
          >
            Create New Oscillator
        </Button>
        </div>
      </Grid>
      {oscillatorNodes.map((node, i) => (
        <Paper key={i} elevation={3} className="oscillator-container">
          <Grid container spacing={1} justify="flex-end">
            <Grid item key={`remove-${i}`}>
                <Button onClick={() => deleteOscillator(i)}>
                  <HighlightOffIcon></HighlightOffIcon>
                </Button>
              </Grid>
            </Grid>
          <Grid container spacing={6} justify="center">
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
              <div className="slider-label">Pan</div>
              <Slider
                aria-labelledby="continuous-slider"
                className='oscillator-control-item'
                min={-100}
                max={100}
                value={node.pan * 100}
                onChange={(e, value) => changePan(e, value, i)}
              />
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


