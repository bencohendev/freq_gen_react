import React from 'react'
import { Grid, Paper, Button, Slider } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FrequencySelector from './FrequencySelector'
import FrequencySlider from './FrequencySlider'
import { Volume } from '../../components/Volume'

export const StaticPlayer = (props) => {

  const { createNode, deleteOscillator, oscillatorNodes, changeVolume, changePan, frequency, changeFrequency, playPause, playing } = props
  console.log(oscillatorNodes)

  return (
    <div className="main">
      <Grid>
        <div className="create-oscillator-btn">
          <Button
            onClick={()=>createNode()}
            color="secondary"
            variant="contained"
          >
            Create New Oscillator
        </Button>
        </div>
      </Grid>
      {oscillatorNodes.map((node, i) => (
        <Paper key={i} elevation={3} className="oscillator-container">
          <Grid container wrap="nowrap" alignItems="center" >
            <Grid item xs={12}>
              <Grid container wrap="nowrap" alignItems="center" justify="center" spacing={3}>
                <Grid item xs={12} lg={1} className="play-container">
                  <Button
                    key={`start-${i}`}
                    variant="contained"
                    color="primary"
                    onClick={() => playPause(node, i)}
                    className="oscillator-control-item"
                  >
                    {playing[i] === 'Play'
                      ? 'Play'
                      : 'Pause'}
                  </Button>
                </Grid>
                <Grid item xs={12} lg={4} key={`volume-${i}`}>
                <Volume oscillatorNodes={oscillatorNodes} changeVolume={changeVolume} i={i}/>
                </Grid>
                <Grid item xs={12} lg={4} key={`pan-${i}`}>
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
                <Grid item key={`remove-${i}`}>
                  <Button onClick={()=>deleteOscillator(i)}>
                    <HighlightOffIcon></HighlightOffIcon>
                  </Button>

                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className="row center">
                  <FrequencySlider oscillator={node.oscillatorNode} oscillatorIndex={i} changeFrequency={(e, value) => changeFrequency(e, value, i)} />
                </div>
                <div className="row center">
                  <FrequencySelector key={`selector-${i}`} frequency={frequency} oscillatorIndex={i} changeFrequency={(e, value) => changeFrequency(e, value, i)} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )
}


