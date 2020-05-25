import React from 'react'
import { Slider } from '@material-ui/core'

export const Pan = (props) => {

  const {oscillatorNodes, changePan, i} = props
  const oscillatorNode = i ? oscillatorNodes[i] : oscillatorNodes[0]
  return(
    <div>
      <div className="field-label">Pan</div>
      <Slider
        aria-labelledby="continuous-slider"
        min={-100}
        max={100}
        value={oscillatorNode.pan * 100}
        onChange={(e, value) => changePan(e, value, i)}
/>
    </div>
  )
}

