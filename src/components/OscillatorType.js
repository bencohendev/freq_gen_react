import React from 'react'
import { Select } from '@material-ui/core'

export const OscillatorType = (props) => {

    const {changeOscillatorType, i} = props
    return (
        <Select
          native
          onChange={(e, value, i)=>changeOscillatorType(e, value, i)}
        >
          <option>Sine</option>
          <option>Square</option>
          <option>Triangle</option>
          <option>Sawtooth</option>
        </Select>
    )
}


