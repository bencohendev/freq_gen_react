import React, {useState, useEffect, useReducer} from 'react'
import { StaticPlayer } from './StaticPlayer'


export const StaticController = (props) => {

  const {context, pitchArray} = props

  
  const [fundamental, setFundamental] = useState(207.652)

  const createNode = (freqVal, panVal, playVal, onOff) => { 
    
    const oscillatorNode = context.createOscillator();
    //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
    const oscillatorGainNode = context.createGain()
    const onOffNode = context.createGain()
    const panNode = context.createPanner()
  
    //initialize node values
    oscillatorGainNode.gain.setValueAtTime(.5, context.currentTime)
    onOffNode.gain.setValueAtTime(onOff, context.currentTime)      
    panNode.panningModel = 'equalpower'
    panNode.setPosition(panVal, 0, 0)
  
    //connect node chain
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorGainNode.connect(onOffNode)
    onOffNode.connect(panNode)
    panNode.connect(context.destination)
  
  
    oscillatorNode.start()
  
    oscillatorNode.frequency.setValueAtTime(freqVal, context.currentTime)
  
  
    //saves oscillator values as object that can be manipulated later
    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      oscillatorGainNode: oscillatorGainNode,
      onOffNode: onOffNode,
      oscillatorPanNode: panNode,
      frequency: freqVal,
      type: oscillatorNode.type,
      gain: 50,
      pan: panVal,
      playing: playVal,
  }
  return oscillatorNodeValues
  }


  const [nodes, dispatch] = useReducer(
    reducer, 
    [createNode(440, 0, 'Play', 0)]
    )


//reducer function handles all basic functions of oscillator nodes
function reducer(nodes, action) {
  const oscillatorNodeCopy = [...nodes]
  const selectedOscillatorNode = oscillatorNodeCopy[action.i]
  let freqVal = null
  let panVal = null  
  let playVal = null
  let onOff = null
  let i = null

  switch (action.type) {
    case 'create':
      if((action.play === 'Pause') && (action.i%2 === 0)) {
        panVal = -1

      } else if((action.play === 'Pause') && (action.i%2 != 0)) {
        panVal = 1
      } else if(action.play === 'Play') {
        panVal = 0
      }
      action.freq ? freqVal = action.freq : freqVal = 440
      action.play ? playVal = action.play : playVal = 'Play'
      action.onOff ? onOff = action.onOff : onOff = '0'
      const newNode = createNode(freqVal, panVal, playVal, onOff)
      console.log(nodes)
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

    case 'play-all':
      oscillatorNodeCopy.map((node) => {
        node.onOffNode.gain.setValueAtTime(1, context.currentTime)
        node.playing = 'Pause'
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
    
    default:
      throw new Error();    
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

    const i = null

    switch (selectedPreset) {
      case '1 - 3 - 5':
        dispatch({type: 'clear'})
        freqMultiplier = [1, 3, 5]
        freqArray = freqMultiplier.map((multiplier) => {
          return multiplier * fundamental
        })
        freqArray.map((freq, i) => {
          dispatch({type: 'create', freq, i})
        })        
      break
      case '1 - 3 - 5 - 8':
        dispatch({type: 'clear'})
        freqMultiplier = [1, 3, 5, 7.1]
        freqArray = freqMultiplier.map((multiplier) => {
          return multiplier * fundamental
        })
        freqArray.map((freq) => {
          dispatch({type: 'create', freq, i})
        }) 
      break  
    }
  }

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
