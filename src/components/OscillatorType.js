import React from 'react'
import { Select } from '@material-ui/core'

export const OscillatorType = (props) => {

    const {oscillatorNodes, changeOscillatorType, i} = props
    const oscillatorNode = oscillatorNodes[i]
    return (
        <Select
          native
          value={oscillatorNode.type}
          onChange={(e, value)=>changeOscillatorType(e, value)}
        >
            <option value={'sine'}>Sine</option>
            <option value={'square'}>Square</option>
            <option>Triangle</option>
            <option>Sawtooth</option>
        </Select>
    )
}


