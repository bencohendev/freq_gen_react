import React from 'react'
import { Slider } from '@material-ui/core'

export const Volume = (props) => {

  const {oscillatorNodes, changeVolume, i} = props
  const oscillatorNode = i ? oscillatorNodes[i] : oscillatorNodes[0]
  return(
    <div>
    <div className="field-label">Volume</div>
      <Slider
        aria-labelledby="continuous-slider"
        min={0}
        max={100}
        value={oscillatorNode.gain}
        onChange={(e, value) => changeVolume(e, value, i)}
      />
    </div>
  )
}