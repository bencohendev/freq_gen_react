import React from 'react'
import { Slider } from '@material-ui/core';
import '../../App.css'


export const FrequencySlider = (props) => {

  const { oscillatorNodes, i, changeFrequency, nodes } = props
  const oscillator = i ? nodes[i] : nodes[0]
  const frequency = oscillator.frequency
  return (
    <div>
      <p className="field-label">Frequency Slider </p>
      <Slider
        aria-labelledby="continuous-slider"
        min={3}
        max={14.5}
        step={.001}
        value={Math.log2(frequency)}
        onChange={(e, value) => changeFrequency(e, value, i)}
        className='frequency'
      />
      <div>{Math.round((frequency + Number.EPSILON) * 1000) / 1000}</div>
    </div>
  )
}
