import React from 'react'
import { Slider } from '@material-ui/core'

export const Volume = (props) => {

  const {oscillatorNodes, changeVolume, i} = props
  const oscillatorNode = i ? oscillatorNodes[i] : oscillatorNodes[0]
  return(
    <div>
    <div className="slider-label">Volume</div>
      <Slider
        aria-labelledby="continuous-slider"
        className='oscillator-control-item'
        min={0}
        max={100}
        value={oscillatorNode.gain}
        onChange={(e, value) => changeVolume(e, value, i)}
      />
    </div>
  )
}