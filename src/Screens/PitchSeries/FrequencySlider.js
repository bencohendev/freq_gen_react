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
        min={0}
        max={18000}
        value={oscillator.frequency.value}
        onChange={(e, value) => changeFrequency(e, value, oscillatorIndex)}
        className='frequency'
      />
    </div>
  )
}

export default FrequencySlider

