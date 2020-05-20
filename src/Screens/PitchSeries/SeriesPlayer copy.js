import React from 'react'
import { Grid, Paper, Typography, FormControl, Button, Select, Input, Checkbox } from '@material-ui/core';
import { Volume } from '../../components/Volume'

export const SeriesPlayer = (props) => {

  const {oscillatorNodes, oscillatorNode, minFrequencyValue, updateMinFrequencyValue, maxFrequencyValue, updateMaxFrequencyValue, pitchArray, instrumentSelector, updateNumberOfPitches, updateBpm, updateInfinitePitchSets, changeVolume, playPause, playing} = props
  
  return (
    <div className="main">
      <Paper elevation={3}>
      <Grid container justify='center'>
        <Grid item lg={3}>
          <FormControl>
          <Select
            native
            onChange={(e)=>instrumentSelector(e)}
          >
            <option>Select an Instrument</option>
            <option>Electric Guitar</option>
            <option>Bb Saxophone</option>
          </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl>
          <Select
            native
            onChange={(e)=>updateMinFrequencyValue(e)}
          >
          {
            pitchArray.map((pitchObject, index) => {
                if(pitchObject.frequency < maxFrequencyValue){
                return(                    
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
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <Select
            native
            onChange={(e)=>updateMaxFrequencyValue(e)}
          >
          {
            pitchArray.map((pitchObject, index) => {
                if(pitchObject.frequency > minFrequencyValue){
                return(                    
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
      <Grid container justify='center'>
        <Grid item lg={6}>
            <Input
              type='number'
              placeholder='number of pitches'
              onChange={(e)=>updateNumberOfPitches(e)}
            />
            
        </Grid>
        <Grid item lg={6}>
        <Input 
                type='number'
                placeholder='bpm'
                onChange={(e)=>updateBpm(e)}
            />
        </Grid>
      </Grid>
      <Grid container justify="center">
      <Typography>Check to only play one pitch set</Typography>
      </Grid>
      <Grid container justify="center">        
        <Checkbox
            onChange={(e)=>updateInfinitePitchSets(e)}
        />
      </Grid>
      <Grid container  justify="center">
        <Grid item xs={6}>
        {oscillatorNode ? <Volume oscillatorNodes={oscillatorNodes} changeVolume={changeVolume} />: null  }
      </Grid>
      </Grid>
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => playPause()}
          className="oscillator-control-item"
        >
          {playing === 'Play'
            ? 'Play'
            : 'Pause'}
        </Button>
      </Grid>
      </Paper>
    </div>
  )

}
