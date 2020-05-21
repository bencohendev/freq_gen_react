import React from 'react'
import { Slider } from '@material-ui/core';
import '../../App.css'


const FrequencySlider = (props) => {

  const { oscillator, oscillatorIndex, changeFrequency } = props
  return (
    <div>
      <p>Frequency Slider </p>
      <Slider
        aria-labelledby="continuous-slider"
        min={3}
        max={14.5}
        step={.0001}
        value={Math.log2(oscillator.frequency.value)}
        onChange={(e, value) => changeFrequency(e, value, oscillatorIndex)}
        className='frequency'
      />
      <div>{oscillator.frequency.value}</div>
    </div>
  )
}

export default FrequencySlider

