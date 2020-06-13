import React from 'react'
import { Button } from '@material-ui/core'

export const Play = (props) => {

  const {nodes, playPauseWrapper, i} = props
  const node = nodes[i]
  return (
    <Button
      key={`play-button-${i}`}
      variant="contained"
      color={node.playing === 'Play' 
      ? 'primary'
      : 'secondary'
  }
      size="large"
      onClick={() => playPauseWrapper(node, i)}
      className="oscillator-control-item"
      >
      {node.playing === 'Play'
        ? 'Play'
        : 'Pause'}
    </Button>
  )
}
