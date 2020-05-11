import React from 'react'
import Button from 'react-bootstrap/Button'
import '../css/ToneGenerator.css';

const AddOscillator = (props) => {


    return (
    <Button
        onClick={()=>props.addOscillatorNode()}
        className='add-oscillator'
    >
        Add New Oscillator
    </Button>
    )
}

export default AddOscillator