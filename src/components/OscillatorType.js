import React from 'react'
import '../css/App.css';

const OscillatorType = (props) => {

    const {updateOscillatorType} = props

    return (
        <select
            onChange={updateOscillatorType}
        >
            <option>Sine</option>
            <option>Square</option>
            <option>Triangle</option>
            <option>Sawtooth</option>
        </select>
    )
}

export default OscillatorType

