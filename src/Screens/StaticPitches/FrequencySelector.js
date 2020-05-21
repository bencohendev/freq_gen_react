import React from 'react';
import '../../App.css'
import { Button, Popper, Paper, ClickAwayListener, makeStyles } from '@material-ui/core';


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
  },
}));

const FrequencySelector = (props) => {

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
          <div>
          <div className='pitch-row'>
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
        </div>

        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        <div className='pitch-row'>
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
        </div>
        </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}


// const FrequencySelector = (props) => {
  // const pitches = [32.703, 34.648, 36.708, 38.891, 41.203, 43.454, 46.249, 48.999, 51.913, 55, 58.270, 61.735]
  // const pitchNames = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
  // const { changeFrequency, oscillatorIndex } = props

//   const [open, setOpen] = React.useState(false);
//   const classes = useStyles();

//   const handleClick = () => {
//       setOpen((prev) => !prev);
//     };

//     const handleClickAway = () => {
//       setOpen(false);
//     };

//   return (
//     <React.Fragment>
//         <ClickAwayListener onClickAway={handleClickAway}>
//       <div className={classes.root}>
//       <Button  variant="contained" onClick={handleClick} >
//         Select a Pitch
//       </Button>
//       </div>
//     </ClickAwayListener>

//       <Popper  className={classes.dropdown} open={open} placement="bottom" >
//         <Paper elevation={5}>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"
          //         className="pitch-btn"
          //         key={i}
          //         onClick={(e) =>changeFrequency(pitch, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}1
          //       </Button>
          //     ))
          //   }
          // </div>

          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) =>changeFrequency(pitch*2, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}2
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 4, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}3
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 8, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}4
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 16, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}5
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 32, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}6
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 64, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}7
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 128, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}8
          //       </Button>
          //     ))
          //   }
          // </div>
          // <div className='pitch-row'>
          //   {
          //     pitches.map((pitch, i) => (
          //       <Button
          //         variant="outlined"

          //         className="pitch-btn"

          //         key={i}
          //         onClick={(e) => changeFrequency(pitch * 256, oscillatorIndex)}
          //       >
          //         {pitchNames[i]}9
          //       </Button>
          //     ))
          //   }
          // </div>
//         </Paper>
//       </Popper>
//     </React.Fragment>
//   )
// }



export default FrequencySelector