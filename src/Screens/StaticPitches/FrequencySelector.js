import React from 'react';
import '../../App.css'
import { Grid, Button, ClickAwayListener, makeStyles } from '@material-ui/core';


 const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    maxWidth: 250,
  },
}));

export const FrequencySelector = (props) => {

  const pitches = [32.703, 34.648, 36.708, 38.891, 41.203, 43.454, 46.249, 48.999, 51.913, 55, 58.270, 61.735]
  const pitchNames = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
  const { changeFrequency, oscillatorIndex } = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = (e, pitch) => {
    setOpen((prev) => !prev);
    if(pitch) {
      changeFrequency(pitch, oscillatorIndex)
    }
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <Button type="button" variant="contained" onClick={handleClick}>
          Select a Pitch
        </Button>
        {open ? (
          <Grid container spacing={2}>
          <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch)}
              >
                {pitchNames[i]}1
              </Button>
            ))
          }
        </Grid>

        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*2)}
              >
                {pitchNames[i]}2
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*4)}
              >
                {pitchNames[i]}3
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*8)}
              >
                {pitchNames[i]}4
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*16)}
              >
                {pitchNames[i]}5
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*32)}
              >
                {pitchNames[i]}6
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*64)}
              >
                {pitchNames[i]}7
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"

                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*128)}
              >
                {pitchNames[i]}8
              </Button>
            ))
          }
        </Grid>
        <Grid item xs={12} >
          {
            pitches.map((pitch, i) => (
              <Button
                variant="outlined"
                className="pitch-btn"
                key={i}
                onClick={(e) =>handleClick(e, pitch*256)}
              >
                {pitchNames[i]}9
              </Button>
            ))
          }
        </Grid>
        </Grid>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}