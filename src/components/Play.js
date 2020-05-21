import React from 'react'
import { Button } from '@material-ui/core'

export const Play = (props) => {

  const {oscillatorNodes, playPauseWrapper, playing, i} = props
  const oscillatorNode = oscillatorNodes[i]
  return (
    <Button
      key={`play-button-${i}`}
      variant="contained"
      color="primary"
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
