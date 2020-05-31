import React, {useState, useEffect, useReducer} from 'react'
import Audio from '../../components/Audio'
import { StaticPlayer } from './StaticPlayer'


//reducer function handles all basic functions of oscillator nodes
function reducer(nodes, action) {
  const oscillatorNodeCopy = [...nodes]
  const selectedOscillatorNode = oscillatorNodeCopy[action.i]
  switch (action.type) {
    case 'create':
      const newNode = createNode()
      nodes=[...nodes, newNode]
      return nodes
    break
    case 'delete':
      const deletedNode = oscillatorNodeCopy.splice(action.i, 1)
      deletedNode[0].onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)        
      nodes = oscillatorNodeCopy
      return nodes
    break
    case 'play/pause':
      if(selectedOscillatorNode.onOffNode.gain.value === 0) {  
        selectedOscillatorNode.onOffNode.gain.setValueAtTime(1, Audio.context.currentTime)
        selectedOscillatorNode.playing = "Pause"
      } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
        selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
        selectedOscillatorNode.playing = "Play"
      }
      nodes = oscillatorNodeCopy
      return nodes
    break
    case 'volume':    
      selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(action.value/100, Audio.context.currentTime)
      selectedOscillatorNode.gain = action.value
      nodes = oscillatorNodeCopy
      return nodes
    break
    case 'mute':
      oscillatorNodeCopy.map((node) => {
        node.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
        node.playing = 'Play'
      })
      nodes = oscillatorNodeCopy
      return nodes
    case 'oscillator':
      const oscillatorType = action.value.toLowerCase()
      selectedOscillatorNode.oscillatorNode.type = oscillatorType
      nodes = oscillatorNodeCopy
      return nodes
    break
    case 'pan':
      selectedOscillatorNode.oscillatorPanNode.setPosition(action.value/100, 0 ,0)
      selectedOscillatorNode.pan = action.value / 100
      nodes = oscillatorNodeCopy
      return nodes
    break
    case 'frequency-slide':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(2**action.value, Audio.context.currentTime)
      selectedOscillatorNode.frequency = 2**action.value
      nodes = oscillatorNodeCopy
      return nodes
    break

    case 'frequency-select':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(action.value, Audio.context.currentTime)
      selectedOscillatorNode.frequency = action.value
      nodes = oscillatorNodeCopy
      return nodes
    break
    default:
      throw new Error();
    break
  }
}

//creates a new oscillator node
const createNode = () => {

  const oscillatorNode = Audio.context.createOscillator();
  //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
  const oscillatorGainNode = Audio.context.createGain()
  const onOffNode = Audio.context.createGain()
  const panNode = Audio.context.createPanner()

  //initialize node values
  oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
  onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)      
  panNode.panningModel = 'equalpower'
  panNode.setPosition(0, 0, 0)

  //connect node chain
  oscillatorNode.connect(oscillatorGainNode)
  oscillatorGainNode.connect(onOffNode)   
  onOffNode.connect(panNode)
  panNode.connect(Audio.context.destination)

  oscillatorNode.start()

  //saves oscillator values as object that can be manipulated later
  const oscillatorNodeValues = {
    oscillatorNode: oscillatorNode,
    onOffNode: onOffNode,
    oscillatorGainNode: oscillatorGainNode,
    oscillatorPanNode: panNode,
    frequency: oscillatorNode.frequency.value,
    type: oscillatorNode.type,
    gain: 50,
    pan: 0,
    playing: 'Play',
}
return oscillatorNodeValues
}


export const StaticController = () => {

  const [nodes, dispatch] = useReducer(
    reducer, 
    [createNode()]
    )

  const suspendContext = () => {
    Audio.context.suspend()
  }

  useEffect(suspendContext, [])


  //play or pause by turning onOffNode to 1 or 0 respectively
  const playPauseWrapper = (node, i) => {
    if(Audio.context.state === 'suspended') {
      Audio.context.resume()
      .then(() => {
        actualPlayPause(node, i)
    })
    } else {
      actualPlayPause(node, i)
    }
  }

  const actualPlayPause = (node, i) => {
    dispatch({type: 'play/pause', i})
  }

  return (
    <StaticPlayer 
      dispatch={dispatch}
      nodes={nodes}
      playPauseWrapper={playPauseWrapper} 
    />
  )
}
