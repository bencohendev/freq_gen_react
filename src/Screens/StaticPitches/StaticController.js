import React, {useState, useEffect, useReducer} from 'react'
import { StaticPlayer } from './StaticPlayer'


export const StaticController = (props) => {

  const {context, pitchArray, createNode} = props

  
  const [fundamental, setFundamental] = useState(207.652)
  
  const [nodes, dispatch] = useReducer(
    reducer, 
    [createNode(440)]
    )


//reducer function handles all basic functions of oscillator nodes
function reducer(nodes, action) {
  const oscillatorNodeCopy = [...nodes]
  const selectedOscillatorNode = oscillatorNodeCopy[action.i]
  let frequency = null
  switch (action.type) {
    case 'create':
      action.freq ? frequency = action.freq : frequency = 440
      const newNode = createNode(frequency)
      nodes=[...nodes, newNode]
      return nodes
    break
    case 'delete':
      const deletedNode = oscillatorNodeCopy.splice(action.i, 1)
      deletedNode[0].onOffNode.gain.setValueAtTime(0, context.currentTime)        
      nodes = oscillatorNodeCopy
      return nodes
    break
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
    break
    case 'volume':    
      selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(action.value/100, context.currentTime)
      selectedOscillatorNode.gain = action.value
      nodes = oscillatorNodeCopy
      return nodes
    break
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
    break
    case 'pan':
      selectedOscillatorNode.oscillatorPanNode.setPosition(action.value/100, 0 ,0)
      selectedOscillatorNode.pan = action.value / 100
      nodes = oscillatorNodeCopy
      return nodes
    break
    case 'frequency-slide':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(2**action.value, context.currentTime)
      selectedOscillatorNode.frequency = 2**action.value
      nodes = oscillatorNodeCopy
      return nodes
    break

    case 'frequency-select':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(action.value, context.currentTime)
      selectedOscillatorNode.frequency = action.value
      nodes = oscillatorNodeCopy
      return nodes
    break
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
    break
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
        freqMultiplier = [1, 3, 5]
        freqArray = freqMultiplier.map((multiplier) => {
          return multiplier * fundamental
        })
        freqArray.map((freq) => {
          dispatch({type: 'create', freq})
        })        
      break
      case '1 - 3 - 5 - 8':
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
    if(context.state === 'suspended') {
      context.resume()
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
      overtonePreset={overtonePreset}
      playPauseWrapper={playPauseWrapper} 
      pitchArray={pitchArray}
      fundamentalSetter={fundamentalSetter}
    />
  )
}
