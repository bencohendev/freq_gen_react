import React from 'react'
import Button from 'react-bootstrap/Button'
import '../css/App.css';

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