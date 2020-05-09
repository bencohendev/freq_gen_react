import React, {useState, useEffect} from 'react';
import '../css/ToneGenerator.css';
import Audio from './Audio'
import FrequencySelector from './FrequencySelector';

const ToneGenerator = () => {

    //set play state
    const [playing, setPlaying] = useState('Play')

    const [oscillatorNodes, setOscillatorNodes] = useState([])

    //set state to represent initial value of masterGainNode
    const [masterGainValue, setMasterGainValue] = useState(0)

    const [frequencyValue, setFrequencyValue] = useState(440)

    // initialize state for selected oscillator index
    const [selectedOscillatorNodeIndex, setSelectedOscillatorNodeIndex] = useState(-1)


    const initializeMasterGain = () => {
        // Connect the masterGainNode to the audio context to allow it to output sound.
        Audio.masterGainNode.connect(Audio.context.destination)

        // Set masterGain Value to 0
        Audio.masterGainNode.gain.setValueAtTime(0, Audio.context.currentTime)
    }


    //initialize masterGainNode on first render
    useEffect(initializeMasterGain, [])


    const addOscillatorNode = () => {
        // Create a GainNode for the oscillator, set it to 0 volume and connect it to masterGainNode
        const oscillatorGainNode = Audio.context.createGain()
        oscillatorGainNode.gain.setValueAtTime(0, Audio.context.currentTime)
        oscillatorGainNode.connect(Audio.masterGainNode)

        // Create OscillatorNode, connect it to its GainNode, and make it start playing.
        const oscillatorNode = Audio.context.createOscillator()
        oscillatorNode.connect(oscillatorGainNode)
        oscillatorNode.start()
        // Store the nodes along with their values in state.
        // Note: When an oscillator is created, frequency is set to 440,
        // and type is set to 'sine' by default.
        const oscillatorNodeValues = {
            oscillatorNode: oscillatorNode,
            oscillatorGainNode: oscillatorGainNode,
            frequency: oscillatorNode.frequency.value,
            type: oscillatorNode.type,
            gain: 0
            
        }
        setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])

        // Set selectedOscillatorNode to the new oscillator index.
        setSelectedOscillatorNodeIndex(oscillatorNodes.length)
    }

    useEffect(addOscillatorNode, [])

    const changeMasterVolume = (e) => {

        if(typeof e === 'object') {
            e = e.target.value
        }
        
        setMasterGainValue(e/100)
        //update selected OscillatorNode's GainNode to the selected value
        if (selectedOscillatorNodeIndex >= 0) {
            const oscillatorNodesCopy = [...oscillatorNodes]
            const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]

            // set the gain of the OscillatorNode's GainNode
            selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(
                e/100, Audio.context.currentTime
            )

            // set the value stored in state for the gain
            selectedOscillatorNode.gain = e
            setOscillatorNodes(oscillatorNodesCopy)
        }
    }

    const changeFrequencyValue = (e) => {

        if(typeof e === 'object') {
            e = e.target.value
        }
        setFrequencyValue(e)
        if (selectedOscillatorNodeIndex >= 0) {
            const oscillatorNodesCopy = [...oscillatorNodes]
            const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]
  
            selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(
                e, Audio.context.currentTime
            )

            setOscillatorNodes(oscillatorNodesCopy)
        }

    }

    const updateOscillatorType = (e) => {
       
        if (selectedOscillatorNodeIndex >= 0) {
            const oscillatorNodesCopy = [...oscillatorNodes]
            const selectedOscillatorNode = oscillatorNodesCopy[selectedOscillatorNodeIndex]
            const oscillatorType = e.target.value.toLowerCase()
            selectedOscillatorNode.oscillatorNode.type = oscillatorType

            setOscillatorNodes(oscillatorNodesCopy)
        }
    }

    // Fade in the MasterGainNode gain value to masterGainValue on mouseDown by .001 seconds
    const play = () => {
        Audio.masterGainNode.gain.setTargetAtTime(masterGainValue, Audio.context.currentTime, 0.001)
    }

    // Fade out the MasterGainNode gain value to 0 on mouseDown by .001 seconds
    const pause = () => {
        Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
    }


    const playOrPause = (playing) => {
        if (playing === 'Play') {
            setPlaying('Pause')
            play() 
        }
        if (playing === 'Pause') {
            setPlaying('Play')
            pause()
        }
    }

  return(  
    <div>
        <p>Volume: </p>
            <input
                type="range"
                min='0'
                max='100'
                value={masterGainValue*100}
                onChange={changeMasterVolume}
                className='pad-volume'
            />
            <p>Frequency Slider</p>
            <input
                type="range"
                min='0'
                max='20000'
                value={frequencyValue}
                onChange={changeFrequencyValue}
                className='frequency'
            />
            <FrequencySelector changeFrequencyValue={changeFrequencyValue} setFrequencyValue={setFrequencyValue}/>
        <select
            onChange={updateOscillatorType}
        >
            <option>Sine</option>
            <option>Square</option>
            <option>Triangle</option>
            <option>Sawtooth</option>
        </select>
        <button
            onClick={()=>playOrPause(playing)}
            className='play'
        >
            {playing}
        </button>
    </div>
  )

}

export default ToneGenerator