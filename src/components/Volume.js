import React, {useState} from 'react'
import Audio from './Audio'
import '../css/SynthPad.css';
 

const Volume = (props) => {

    const { value, selectedOscillatorNodeIndex, oscillatorNodes, setOscillatorNodes, setMasterGainValue } = props

        const changeMasterVolume = (e) => {
        
        setMasterGainValue(e.target.value/100)
        //update selected OscillatorNode's GainNode to the selected value
        if (selectedOscillatorNodeIndex >= 0) {
            const oscillatorNodesCopy = [...oscillatorNodes]
            const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]

            // set the gain of the OscillatorNode's GainNode
            selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(
                e.target.value/100, Audio.context.currentTime
            )

            // set the value stored in state for the gain
            selectedOscillatorNode.gain = e.target.value
            setOscillatorNodes(oscillatorNodesCopy)
        }
    }



    return(  
        <div>
            <p>Master Volume: </p>
                <input
                    type="range"
                    min='0'
                    max='100'
                    value={value*100}
                    onChange={changeMasterVolume}
                    className='pad-volume'
                />
        </div>
    )
}

export default Volume