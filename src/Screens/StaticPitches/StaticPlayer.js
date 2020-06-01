import React from 'react'
import { Grid, Paper, Button, Slider, Select } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { FrequencySelector } from './FrequencySelector'
import { FrequencySlider } from './FrequencySlider'
import { Volume } from '../../components/Volume'
import { Play } from '../../components/Play'
import { OscillatorType } from '../../components/OscillatorType'

export const StaticPlayer = (props) => {

  const { dispatch, nodes, overtonePreset, playPauseWrapper } = props
  return (
    <div>
      <div className="oscillator-control-container">
      <Grid container justify='flex-start'  spacing={3}>
        <Grid item >
          <Button
            onClick={() => dispatch({type: 'create'})}
            className="green-btn"
            variant="contained"
          >
            Create New Oscillator
         </Button>
         </Grid>
         <Grid item >
         <Button
          onClick={() => dispatch({type: 'mute'})}
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
      {nodes.map((node, i) => (
        <Paper key={i} elevation={3} className="oscillator-container">
          <Grid container spacing={1} justify="flex-end">
            <Grid item key={`remove-${i}`}>
                <Button onClick={() => dispatch({type: 'delete', i})}>
                  <HighlightOffIcon></HighlightOffIcon>
                </Button>
              </Grid>
            </Grid>
          <Grid container spacing={6} justify="center" alignItems="center">
            <Grid item xs={6} md={2} key={`play-${i}`} className="play-container">
              <Play nodes={nodes} playPauseWrapper={playPauseWrapper} i={i} />
            </Grid>
            <Grid item xs={6} md={2} key={`type-${i}`} className="play-container">
              <OscillatorType nodes={nodes} dispatch={(value, i)=>dispatch({type: 'oscillator', value, i})} i={i} />
            </Grid>
            <Grid item xs={5} md={3} key={`volume-${i}`}>
              <Volume nodes={nodes} dispatch={(event, value, i) => dispatch({type:'volume', event, value, i})} i={i} />
            </Grid>
            <Grid item xs={5} md={3} key={`pan-${i}`}>
              <div className="field-label">Pan</div>
              <Slider
                aria-labelledby="continuous-slider"
                min={-100}
                max={100}
                value={node.pan * 100}
                onChange={(e, value) => dispatch({type:'pan', e, value, i})}
              />
            </Grid>
          <Grid container justify="center">
            <Grid item  xs={9}>
              <FrequencySlider key={`frequency-${i}`} nodes={nodes} i={i} dispatch={(e, value, i) => dispatch({type:'frequency-slide', e, value, i})} />
            </Grid>
          </Grid>
          <Grid item  xs={12}>
            <FrequencySelector key={`selector-${i}`} oscillatorIndex={i} dispatch={(value, i) => dispatch({type:'frequency-select', value, i})} />
          </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )
}


