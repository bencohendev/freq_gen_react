import React from 'react'
import Button from 'react-bootstrap/Button'


export const ToneGenerator = () => {


const play = () => {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    
    var oscillatorNode = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    var finish = audioCtx.destination;
    console.log(oscillatorNode)
    oscillatorNode.connect(audioCtx.destination)
    oscillatorNode.start()

}

    return (
        <Button
            onClick={play} 
        >
            play
        </Button>
        
    )
}

