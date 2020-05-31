import React from 'react'
import { Slider } from '@material-ui/core'

export const Volume = (props) => {

  const changeVolume = () => {
    console.log()
    //let value = e.target.value
   // dispatch(value, i)
  }

  const {nodes, dispatch, i} = props
  const oscillatorNode = i ? nodes[i] : nodes[0]
  return(
    <div>
    <div className="field-label">Volume</div>
      <Slider
        aria-labelledby="continuous-slider"
        min={0}
        max={100}
        value={oscillatorNode.gain}
        onChange={(event, value) => dispatch(event, value, i)}
      />
    </div>
  )
}