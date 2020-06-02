import React, {useState, useEffect, useReducer} from 'react'
import { SeriesPlayer } from './SeriesPlayer'

export const SeriesController = (props) => {

  const {createNode, context, pitchArray} = props

  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [playing, setPlaying] = useState([])
  const [frequency, setFrequency] = useState(440)
  const [minFrequency, setMinFrequency] = useState(27.5)
  const [maxFrequency, setMaxFrequency] = useState(7902.133)
  const [selectedFreqArray, setSelectedFreqArray] = useState([])
  const [bpm, setBpm] = useState(1000)
  const [numberOfPitches, setNumberOfPitches] = useState(1) 
  const [infinitePitchSets, setInfinitePitchSets] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)


  const suspendContext = () => {
    context.suspend()
  }

  useEffect(suspendContext, [])

  const [nodes, dispatch] = useReducer(
    reducer, 
    [createNode(440)]
    )


//reducer function handles all basic functions of oscillator nodes
function reducer(nodes, action) {
  const oscillatorNodeCopy = [...nodes]
  const selectedOscillatorNode = oscillatorNodeCopy[action.i]
  let freqVal = null
  let panVal = null  
  let playVal = null

  switch (action.type) {
    case 'create':
      action.freq ? freqVal = action.freq : freqVal = 440
      action.pan ? panVal = action.pan : panVal = 0
      action.play ? playVal = action.play : playVal = "Play"
      const newNode = createNode(freqVal, panVal, playVal)
      nodes=[...nodes, newNode]
      return nodes
    
    case 'clear':
      nodes=[]
      return nodes
    
    case 'play/pause':
      if(selectedOscillatorNode.onOffNode.gain.value === 0) { 
        selectedOscillatorNode.onOffNode.gain.setValueAtTime(1, context.currentTime)   
        selectedOscillatorNode.playing = "Pause"
      } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
        selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, context.currentTime)   
        selectedOscillatorNode.playing = "Play"
      }
      nodes = oscillatorNodeCopy
      return nodes
    
    case 'volume':    
      selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(action.value/100, context.currentTime)
      selectedOscillatorNode.gain = action.value
      nodes = oscillatorNodeCopy
      return nodes

    case 'oscillator':
      const oscillatorType = action.value.toLowerCase()
      selectedOscillatorNode.oscillatorNode.type = oscillatorType
      nodes = oscillatorNodeCopy
      return nodes
    
    default:
      throw new Error();
    break
  }
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
    const oscillatorNodeCopy = [...nodes]
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
    selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(newFreq, context.currentTime)
    setOscillatorNodes(oscillatorNodeCopy)    
  }

//this effect starts and stops the tone generator
useEffect(() => {
  let intervalID = null
  const oscillatorNodeCopy = [...nodes]
  const selectedOscillatorNode = oscillatorNodeCopy[0]
  if( (isPlaying) ) {
      if(infinitePitchSets){
        let i=0
          intervalID = setInterval(() => {
              i++
              if(i===parseInt(numberOfPitches)+1) {
                selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, context.currentTime, 0.001)
                i=0
              } else {
                  const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
                  changeFrequency(pitchToPlay.frequency)
                  selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(1, context.currentTime, 0.001)
              }
              setTimeout(() => {
                selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, context.currentTime, 0.001)
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
                      selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(1, context.currentTime, 0.001)
                  
                  setTimeout(() => {
                    selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, context.currentTime, 0.001)
                      }, (bpm - (bpm/4)));

                  }, (bpm*i));
                  i++
              } else{
              setTimeout(() => {
                  setPlaying(['Play'])
                  setIsPlaying(false)
                  selectedOscillatorNode.seriesGainNode.gain.setTargetAtTime(0, context.currentTime, 0.001)
                  selectedOscillatorNode.onOffNode.gain.setTargetAtTime(0, context.currentTime, 0.001)
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
      selectedOscillatorNode.onOffNode.gain.setTargetAtTime(0, context.currentTime, 0.001)
  } 

}, [isPlaying, selectedFreqArray, bpm, numberOfPitches, setIsPlaying, infinitePitchSets])

  //play or pause by turning onOffNode to 1 or 0 respectively
  const playPauseWrapper = (node, i) => {
    if(node.oscillatorNode.context.state === 'suspended') {
      
      node.oscillatorNode.context.resume()
      .then(() => {
        
        actualPlayPause(i)
    })
    } else {
      actualPlayPause(i)
    }
  }

  const actualPlayPause = (i) => {
    dispatch({type: 'play/pause', i})
  }

  return(
    <SeriesPlayer 
      oscillatorNodes={oscillatorNodes} 
      nodes={nodes}
      dispatch={dispatch}
      playPauseWrapper={playPauseWrapper} 
      playing={playing} 
      instrumentSelector={instrumentSelector}
      minFrequency={minFrequency}
      maxFrequency={maxFrequency}
      changeMinFrequency={changeMinFrequency}
      changeMaxFrequency={changeMaxFrequency}
      pitchArray={pitchArray}
      changeNumberOfPitches={changeNumberOfPitches} 
      changeBpm={changeBpm} 
      changeInfinitePitchSets={changeInfinitePitchSets} 
    />
  )
}