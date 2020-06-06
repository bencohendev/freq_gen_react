
import React, {useState, useEffect} from 'react'
import Audio from './components/Audio'
import { SeriesPlayer } from './SeriesPlayer'

export const SeriesController = () => {

  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [playing, setPlaying] = useState([])
  const [pitchArray, setPitchArray] = useState([])
  const [frequency, setFrequency] = useState(440)
  const [minFrequency, setMinFrequency] = useState(27.5)
  const [maxFrequency, setMaxFrequency] = useState(7902.133)
  const [selectedFreqArray, setSelectedFreqArray] = useState([])
  const [bpm, setBpm] = useState(1000)
  const [numberOfPitches, setNumberOfPitches] = useState(1) 
  const [infinitePitchSets, setInfinitePitchSets] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)




  //creates a new oscillator node
  const createNode = () => {

    const oscillatorNode = Audio.context.createOscillator();
    //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
    const oscillatorGainNode = Audio.context.createGain()
    const seriesGainNode = Audio.context.createGain()
    const onOffNode = Audio.context.createGain()
    const panNode = Audio.context.createPanner()

    //initialize node values
    oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
    seriesGainNode.gain.setValueAtTime(0, Audio.context.currentTime)
    onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)      
    panNode.panningModel = 'equalpower'
    panNode.setPosition(0, 0, 0)

    //connect node chain
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorGainNode.connect(seriesGainNode)
    seriesGainNode.connect(onOffNode)   
    onOffNode.connect(panNode)
    panNode.connect(Audio.context.destination)

    oscillatorNode.start()

    //saves oscillator values as object that can be manipulated later
    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      onOffNode: onOffNode,
      oscillatorGainNode: oscillatorGainNode,
      seriesGainNode: seriesGainNode,
      oscillatorPanNode: panNode,
      frequency: oscillatorNode.frequency.value,
      type: oscillatorNode.type,
      gain: 50,
      pan: 0      
  }
    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setPlaying(['Play'])
  }

  //creates an oscillator on page load
  useEffect(createNode, [])

  const suspendContext = () => {
    Audio.context.suspend()
  }

  useEffect(suspendContext, [])

  const populateAllPitches = () => {
    let fundamentalPitches = [32.703, 34.648, 36.708, 38.891, 41.203, 43.454, 46.249, 48.999, 51.913, 55, 58.270, 61.735]
    const pitchNames = ['c' , 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
    let allPitches = []
    let pitchMultiplier = 1

    for(let i=1; i<=9; i++) {
        for(let j=0; j<=fundamentalPitches.length-1; j++){         
            allPitches.push({pitch: pitchNames[j]+i, frequency: fundamentalPitches[j]*pitchMultiplier})
        }
        pitchMultiplier = pitchMultiplier*2
    }
    setPitchArray(allPitches)
    setSelectedFreqArray(allPitches)
}

useEffect(populateAllPitches, [])

    //change volume of individual oscillators
const changeVolume = (e, value, i) => {
  const oscillatorNodeCopy = [...oscillatorNodes]
  const selectedOscillatorNode = oscillatorNodeCopy[i]
  selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(value/100, Audio.context.currentTime)
  selectedOscillatorNode.gain = value
  setOscillatorNodes(oscillatorNodeCopy)
}

const changeOscillatorType = (e) => {  
  const oscillatorNodeCopy = [...oscillatorNodes]
  const selectedOscillatorNode = oscillatorNodeCopy[0]
  const oscillatorType = e.target.value.toLowerCase()
  selectedOscillatorNode.oscillatorNode.type = oscillatorType
  setOscillatorNodes(oscillatorNodeCopy)  
}



const changeMinFrequency = (e) => {
  if(typeof e === 'object') {
    e = e.target.value
  }
  setMinFrequency(e)
  const filteredPitchArray = pitchArray.filter((pitchObject) => {
    if( (pitchObject.frequency >= e) && (pitchObject.frequency < maxFrequency) ) {
        return true
    }
 })
 setSelectedFreqArray(filteredPitchArray)
  }

  const changeMaxFrequency = (e) => {
    if(typeof e === 'object') {
      e = e.target.value
  }
  setMaxFrequency(e)
  const filteredPitchArray = pitchArray.filter((pitchObject) => {
       if((pitchObject.frequency <= e) && (pitchObject.frequency > minFrequency) ) {
           return true
       }
  })
setSelectedFreqArray(filteredPitchArray)
  }

  const instrumentSelector = (e) => {
    const instrument = e.target.value

    switch (instrument) {
        case 'Electric Guitar':
           changeMinFrequency(82.406)
           changeMaxFrequency(1174.656)
       break;
       case 'Bb Saxophone':
           changeMinFrequency(207.652)
           changeMaxFrequency(2092.992)
       break;
       case 'Test' :
           changeMinFrequency(440)
           changeMaxFrequency(1174.656)
       break;
       default:
         changeMinFrequency(27.5)
         changeMaxFrequency(7902.133)

    }
  }
  const changeBpm = (e) => {
    setBpm(60/e.target.value*1000)
  }
  
  const changeNumberOfPitches = (e) => {
    setNumberOfPitches(e.target.value)
  }
  
  const changeInfinitePitchSets = (e) => {
     if (e.target.checked) {
        setInfinitePitchSets(false)
     } else {
         setInfinitePitchSets(true)
     }
  }
  const changeFrequency = (e, value, i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[0]
    let newFreq = null
    if(typeof e === 'object') {
        e = e.target.value
    }
    if(e) {
      newFreq = e
    }

    if (value) {
      newFreq = value
    }

    setFrequency(newFreq)
    selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(newFreq, Audio.context.currentTime)
    setOscillatorNodes(oscillatorNodeCopy)    
  }

//this effect starts and stops the tone generator
useEffect(() => {
  let intervalID = null
  const oscillatorNodeCopy = [...oscillatorNodes]
  const selectedOscillatorNode = oscillatorNodeCopy[0]

  if( (isPlaying) ) {
      if(infinitePitchSets){
        let i=0
          intervalID = setInterval(() => {
              i++
              if(i===parseInt(numberOfPitches)+1) {
                selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                i=0
              } else {
                  const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
                  changeFrequency(pitchToPlay.frequency)
                  selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
              }
              setTimeout(() => {
                selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
              }, (bpm - (bpm/4)));

          }, (bpm));
          
          return () => clearInterval(intervalID)
      }
      if(!infinitePitchSets){
          const playTheDangThing = (i) => {
              if(i<numberOfPitches) {
              setTimeout(() => {
                  const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
                      changeFrequency(pitchToPlay.frequency)
                      selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
                  
                  setTimeout(() => {
                    selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                      }, (bpm - (bpm/4)));

                  }, (bpm*i));
                  i++
              } else{
              setTimeout(() => {
                  setPlaying(['Play'])
                  setIsPlaying(false)
                  selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                  selectedOscillatorNode.onOffNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                  return
                  }, (bpm*i));
              }    
          }    
          for( let i =0; i <= numberOfPitches; i++ ) {            
              playTheDangThing(i)
          }
      }
      return () => clearInterval(intervalID)
  }

  if( !isPlaying ) {
      window.clearInterval(intervalID)
      Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
  } 

}, [isPlaying, selectedFreqArray, bpm, numberOfPitches, setIsPlaying, infinitePitchSets])

//play or pause by turning onOffNode to 1 or 0 respectively
  const playPauseWrapper = () => {
    if(Audio.context.state === 'suspended') {
    Audio.context.resume()
    .then(() => {      
      actualPlayPause()      
    })
    } else {
      actualPlayPause()
      
    }
  }

  const actualPlayPause = () => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[0]
    if(selectedOscillatorNode.onOffNode.gain.value === 0) {  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(1, Audio.context.currentTime)  
      setOscillatorNodes(oscillatorNodeCopy)
      setPlaying(['Pause'])
      setIsPlaying(true)

  
    } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
       setOscillatorNodes(oscillatorNodeCopy)
       setPlaying(["Play"])
       setIsPlaying(false)

    }
  }

  return(
    <SeriesPlayer 
      oscillatorNodes={oscillatorNodes} 
      playPauseWrapper={playPauseWrapper} 
      playing={playing} 
      changeVolume={changeVolume}
      instrumentSelector={instrumentSelector}
      minFrequency={minFrequency}
      maxFrequency={maxFrequency}
      changeMinFrequency={changeMinFrequency}
      changeMaxFrequency={changeMaxFrequency}
      pitchArray={pitchArray}
      changeNumberOfPitches={changeNumberOfPitches} 
      changeBpm={changeBpm} 
      changeInfinitePitchSets={changeInfinitePitchSets} 
      changeOscillatorType={changeOscillatorType}
    />
  )
}