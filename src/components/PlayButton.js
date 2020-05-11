import React from 'react'
import Button from 'react-bootstrap/Button'
import '../css/ToneGenerator.css';

const PlayButton = (props) => {

    const {playing} = props    

    return (
    <Button
        onClick={()=>props.playOrPause(playing)}
        className='play'
    >
        {playing === 'Pause' 
        ? 'Pause'
        : 'Play'}
    </Button>
    )
}

export default PlayButton