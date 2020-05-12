import React, {useState, useEffect} from 'react';
import '../css/App.css';
import Audio from './Audio'
import FrequencySelector from './FrequencySelector';
import FrequencySlider from './FrequencySlider'
import OscillatorType from './OscillatorType'
import PlayButton from './PlayButton'
import Volume from './Volume'
import AddOscillator from './AddOscillator';

const StaticToneGenerator = () => {

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

    const play = () => {
        Audio.masterGainNode.gain.setTargetAtTime(masterGainValue, Audio.context.currentTime, 0.001)
    }

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
        <Volume masterGainValue={masterGainValue} changeMasterVolume={changeMasterVolume}/>
        <FrequencySlider frequencyValue={frequencyValue} changeFrequencyValue={changeFrequencyValue} />
        <FrequencySelector changeFrequencyValue={changeFrequencyValue} />
        <OscillatorType updateOscillatorType={updateOscillatorType} />
        <PlayButton playing={playing} playOrPause={playOrPause} />
        <AddOscillator addOscillatorNode={addOscillatorNode}/>
    </div>
  )

}

export default StaticToneGenerator