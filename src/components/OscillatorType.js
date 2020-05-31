import React from 'react'
import { Select } from '@material-ui/core'

export const OscillatorType = (props) => {

    const {dispatch, i} = props
    
    const saveSelectEvent = (e) => {
      let value = e.target.value
      dispatch(value, i)
    }


    return (
        <Select
          native
          onChange={(e)=>saveSelectEvent(e)}
        >
          <option>Sine</option>
          <option>Square</option>
          <option>Triangle</option>
          <option>Sawtooth</option>
        </Select>
    )
}


