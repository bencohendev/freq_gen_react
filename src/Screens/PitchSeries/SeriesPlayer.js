import React from 'react'
import { Grid, Paper, Typography, Select, Input, Checkbox } from '@material-ui/core';
import { Volume } from '../../components/Volume'
import { Play } from '../../components/Play'
import { OscillatorType } from '../../components/OscillatorType'



export const SeriesPlayer = (props) => {

  const { nodes, dispatch, playPauseWrapper, playing, instrumentSelector, minFrequency, maxFrequency, changeMinFrequency, changeMaxFrequency, pitchArray, changeNumberOfPitches, changeBpm, changeInfinitePitchSets } = props

  return (
    nodes
      ?
      <Paper elevation={3} className="oscillator-container">
        <Grid container spacing={6} justify='center'>
          <Grid item lg={3}>
            <Select
              native
              onChange={(e) => instrumentSelector(e)}
            >
              <option>Select an Instrument</option>
              <option>Electric Guitar</option>
              <option>Bb Saxophone</option>
            </Select>
          </Grid>
          </Grid>
          <Grid container spacing={6} justify='center'>
            <Grid item lg={3}>
              <Typography>Or Manually Choose a Pitch Range</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={6} justify='center'>
          <Grid item md={2}>
            <Select
              native
              className="frequency-range-selector"
              value={minFrequency}
              onChange={(e) => changeMinFrequency(e)}
            >
              {
                pitchArray.map((pitchObject, index) => {
                  if (pitchObject.frequency < maxFrequency) {
                    return (
                      <option
                        key={index}
                        value={pitchObject.frequency}
                      >
                        {pitchObject.pitch}
                      </option>
                    )
                  }
                })
              }
            </Select>
          </Grid>
          <Grid item md={2}>
            <Select
              native
              className="frequency-range-selector"
              value={maxFrequency}
              onChange={(e) => changeMaxFrequency(e)}
            >
              {
                pitchArray.map((pitchObject, index) => {
                  if (pitchObject.frequency > minFrequency) {
                    return (
                      <option
                        key={index}
                        value={pitchObject.frequency}
                      >
                        {pitchObject.pitch}
                      </option>
                    )
                  }
                })
              }
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={6} justify='center'>
            <Grid item lg={3}>
              <Typography>Set Number of Pitches in Series and Speed</Typography>
            </Grid>
          </Grid>
        <Grid container spacing={6} justify='center' className="series-grid-row">
          <Grid item>
            <Input
              type='number'
              placeholder='number of pitches'
              onChange={(e) => changeNumberOfPitches(e)}
            />

          </Grid>
          <Grid item>
            <Input
              type='number'
              placeholder='bpm'
              onChange={(e) => changeBpm(e)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={6} justify="center">
          <Grid item>
          <Typography>Check to only play one pitch set</Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
          <Checkbox
            onChange={(e) => changeInfinitePitchSets(e)}
          />
          </Grid>
        </Grid>
        <Grid container spacing={6} justify="center">
          <Grid item xs={6}>
          <OscillatorType nodes={nodes} dispatch={(value, i)=>dispatch({type: 'oscillator', value, i})} i={0} />
          </Grid>
        </Grid>
        <Grid container spacing={6} justify="center">
          <Grid item xs={6}>
          <Volume nodes={nodes} dispatch={(event, value, i) => dispatch({type:'volume', event, value, i})} i={0} />
          </Grid>
        </Grid>
        <Grid container spacing={6} justify="center">
          <Grid item xs={6}>
          <Play nodes={nodes} playPauseWrapper={playPauseWrapper} i={0} />
        </Grid>
        </Grid>
      </Paper>



      : <div>Loading</div>


  )


}
