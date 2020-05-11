import React, {useState, useEffect} from 'react';
import '../css/ToneGenerator.css';
import Audio from './Audio'
import FrequencyRangeSelector from './FrequencyRangeSelector'
import OscillatorType from './OscillatorType'
import PlayButton from './PlayButton'
import Volume from './Volume'
import PitchSeriesSelector from './PitchSeriesSelector'

const DynamicToneGenerator = () => {

 //set play state
 const [playing, setPlaying] = useState(null)

 const [oscillatorNodes, setOscillatorNodes] = useState([])

 //set state to represent initial value of masterGainNode
 const [masterGainValue, setMasterGainValue] = useState(0)

 const [frequencyValue, setFrequencyValue] = useState(440)

 const [pitchArray, setPitchArray] = useState([])

 const [minFrequencyValue, setMinFrequencyValue] = useState(27.5)
 const [maxFrequencyValue, setMaxFrequencyValue] = useState(7902.133)
 const [selectedFreqArray, setSelectedFreqArray] = useState([])

 const [bpm, setBpm] = useState(1000)
 const [numberOfPitches, setNumberOfPitches] = useState(1) 
 const [infinitePitchSets, setInfinitePitchSets] = useState(true)

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

 const populateAllPitches = () => {
    let fundamentalPitches = [27.5, 29.135, 30.868, 32.703, 34.648, 36.708, 38.891, 40.203, 43.464, 46.249, 48.999, 51.913]
    const pitchNames = ['a', 'a#', 'b', 'c' , 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#']

    
    let allPitches = []
    let pitchMultiplier = 1
    for(let i=0; i<=8; i++) {
        for(let j=0; j<=fundamentalPitches.length-1; j++){         
            allPitches.push({pitch: pitchNames[j]+i, frequency: fundamentalPitches[j]*pitchMultiplier})
        }
        pitchMultiplier = pitchMultiplier*2
    }
    setPitchArray(allPitches)
    setSelectedFreqArray(allPitches)
}

useEffect(populateAllPitches, [])

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
     console.log('e'+e)
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

 const updateMinFrequencyValue  = (e) => {
    setMinFrequencyValue(e.target.value)
    const filteredPitchArray = pitchArray.filter((pitchObject) => {
        if( (pitchObject.frequency > e.target.value) && (pitchObject.frequency < maxFrequencyValue) ) {
            return true
        }
    })
    setSelectedFreqArray(filteredPitchArray)
}

 const updateMaxFrequencyValue  = (e) => {
    setMaxFrequencyValue(e.target.value)
    const filteredPitchArray = pitchArray.filter((pitchObject) => {
         if((pitchObject.frequency < e.target.value) && (pitchObject.frequency > minFrequencyValue) ) {
             return true
         }
    })
    setSelectedFreqArray(filteredPitchArray)
 }

 const updateBpm = (e) => {
    setBpm(60/e.target.value*1000)
 }

 const updateNumberOfPitches = (e) => {
    setNumberOfPitches(e.target.value)
 }

 const updateInfinitePitchSets = () => {
     if (infinitePitchSets) {
        setInfinitePitchSets(false)
     } else {
         setInfinitePitchSets(true)
     }
 }

 //this effect starts and stops the tone generator
 useEffect(() => {
    let intervalID = null
    if( (playing === 'Pause') ) {
        intervalID = setInterval(() => {  
            const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
            changeFrequencyValue(pitchToPlay.frequency)
            Audio.masterGainNode.gain.setTargetAtTime(masterGainValue, Audio.context.currentTime, 0.001)
        
        setTimeout(() => {
                Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
            }, (bpm - (bpm/4)));
        }, (bpm));


        //if user only wants one set of pitches
        const finiteNumberOfPitches = (parseInt(numberOfPitches) + 1)
        if(!infinitePitchSets){
        setTimeout(() => {
            window.clearInterval(intervalID)
            setPlaying('Play')   
            Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
        }, (bpm * (finiteNumberOfPitches)));
    }

        return () => clearInterval(intervalID)
    }



    if( playing === 'Play' ) {
        window.clearInterval(intervalID)
        Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
    } 

 }, [playing, selectedFreqArray, bpm, numberOfPitches, setPlaying, infinitePitchSets])


 const playOrPause = (playing) => {
     if ( (playing === 'Play') || (!playing)) {
         setPlaying('Pause')
     }
     if (playing === 'Pause') {
         setPlaying('Play')   
     }
 }
 
    return (
        <div>
            <FrequencyRangeSelector pitchArray={pitchArray} changeFrequencyValue={changeFrequencyValue} minFrequencyValue={minFrequencyValue} updateMinFrequencyValue={updateMinFrequencyValue} maxFrequencyValue={maxFrequencyValue} updateMaxFrequencyValue={updateMaxFrequencyValue}/>
            <PitchSeriesSelector updateNumberOfPitches={updateNumberOfPitches} updateBpm={updateBpm} updateInfinitePitchSets={updateInfinitePitchSets}/>
            <Volume masterGainValue={masterGainValue} changeMasterVolume={changeMasterVolume}/>
            <OscillatorType updateOscillatorType={updateOscillatorType} />
            <PlayButton playing={playing} playOrPause={playOrPause} />
        </div>
    )
}

export default DynamicToneGenerator