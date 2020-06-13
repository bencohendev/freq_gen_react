import React from 'react'
import { Button } from '@material-ui/core'

export const Play = (props) => {

  const {oscillatorNodes, playPauseWrapper, playing, i} = props
  const oscillatorNode = oscillatorNodes[i]
  return (
    <Button
      key={`play-button-${i}`}
      variant="contained"
     color={playing[i] === 'Play' 
      ? 'primary'
      : 'secondary'
      }
      size="large"
      onClick={() => playPauseWrapper(oscillatorNode, i)}
      className="oscillator-control-item"
      >
      {playing[i] === 'Play'
        ? 'Play'
        : 'Pause'}
    </Button>
  )
}