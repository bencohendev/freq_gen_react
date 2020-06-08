import React, {useState, useEffect, useReducer} from 'react'
import { StaticPlayer } from './StaticPlayer'


export const StaticController = (props) => {

  const {context, pitchArray} = props

  
  const [fundamental, setFundamental] = useState(207.652)

  const createNode = (freq, series) => { 
    
    const oscillatorNode = context.createOscillator();
    //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
    const oscillatorGainNode = context.createGain()
    const onOffNode = context.createGain()
    const panNode = context.createPanner()
  
    //initialize node values
    oscillatorGainNode.gain.setValueAtTime(.5, context.currentTime)
    onOffNode.gain.setValueAtTime(0, context.currentTime)      
    panNode.panningModel = 'equalpower'
    panNode.setPosition(0, 0, 0)
  
    //connect node chain
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorGainNode.connect(onOffNode)
    onOffNode.connect(panNode)
    panNode.connect(context.destination)
  
  
    oscillatorNode.start()
  
    oscillatorNode.frequency.setValueAtTime(freq, context.currentTime)
  
  
    //saves oscillator values as object that can be manipulated later
    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      oscillatorGainNode: oscillatorGainNode,
      onOffNode: onOffNode,
      oscillatorPanNode: panNode,
      frequency: freq,
      type: oscillatorNode.type,
      gain: 50,
      pan: 0,
      playing: 'Play',
  }
  return oscillatorNodeValues
  }


  const [nodes, dispatch] = useReducer(
    reducer, 
    [createNode(440, 1)]
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
    
    case 'delete':
      const deletedNode = oscillatorNodeCopy.splice(action.i, 1)
      deletedNode[0].onOffNode.gain.setValueAtTime(0, context.currentTime)        
      nodes = oscillatorNodeCopy
      return nodes
    
    case 'clear':
      nodes=[]
      return nodes
    
    case 'play/pause':
      console.log(selectedOscillatorNode)
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
    
    case 'mute':
      oscillatorNodeCopy.map((node) => {
        node.onOffNode.gain.setValueAtTime(0, context.currentTime)
        node.playing = 'Play'
      })
      nodes = oscillatorNodeCopy
      return nodes
    case 'oscillator':
      const oscillatorType = action.value.toLowerCase()
      selectedOscillatorNode.oscillatorNode.type = oscillatorType
      nodes = oscillatorNodeCopy
      return nodes
    
    case 'pan':
      selectedOscillatorNode.oscillatorPanNode.setPosition(action.value/100, 0 ,0)
      selectedOscillatorNode.pan = action.value / 100
      nodes = oscillatorNodeCopy
      return nodes
    
    case 'frequency-slide':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(2**action.value, context.currentTime)
      selectedOscillatorNode.frequency = 2**action.value
      nodes = oscillatorNodeCopy
      return nodes
    

    case 'frequency-select':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(action.value, context.currentTime)
      selectedOscillatorNode.frequency = action.value
      nodes = oscillatorNodeCopy
      return nodes
    
    case 'preset':
      const selectedPreset = action.e.target.value
      switch (selectedPreset) {
        case '1 - 3 - 5':
          for (let i = 0; i<2; i++) {
            createNode()
          }
        break
      }
      nodes = oscillatorNodeCopy
      return nodes
    
    default:
      throw new Error();
    break
  }
}

  const suspendContext = () => {
    context.suspend()
  }

  useEffect(suspendContext, [])


  const fundamentalSetter = (e) => {
    setFundamental(e.target.value)
  }

  const overtonePreset = (e) => {
    const selectedPreset = e.target.value
    let freqMultiplier = null
    let freqArray = null

    switch (selectedPreset) {
      case '1 - 3 - 5':
        dispatch({type: 'clear'})
        freqMultiplier = [1, 3, 5]
        freqArray = freqMultiplier.map((multiplier) => {
          return multiplier * fundamental
        })
        freqArray.map((freq) => {
          dispatch({type: 'create', freq})
        })        
      break
      case '1 - 3 - 5 - 8':
        dispatch({type: 'clear'})
        freqMultiplier = [1, 3, 5, 7.1]
        freqArray = freqMultiplier.map((multiplier) => {
          return multiplier * fundamental
        })
        freqArray.map((freq) => {
          dispatch({type: 'create', freq})
        }) 
      break  
    }
  }

  //play or pause by turning onOffNode to 1 or 0 respectively
  const playPauseWrapper = (node, i) => {
    console.log(node.oscillatorNode.context.state)
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

  return (
    <StaticPlayer 
      dispatch={dispatch}
      nodes={nodes}
      overtonePreset={overtonePreset}
      playPauseWrapper={playPauseWrapper} 
      pitchArray={pitchArray}
      fundamentalSetter={fundamentalSetter}
    />
  )
}
