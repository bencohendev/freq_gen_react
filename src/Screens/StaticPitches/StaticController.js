import React, {useState, useEffect, useReducer} from 'react'
import Audio from '../../components/Audio'
import { StaticPlayer } from './StaticPlayer'


export const StaticController = () => {

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
      case 'oscillator':
        const oscillatorType = action.value.toLowerCase()
        selectedOscillatorNode.oscillatorNode.type = oscillatorType
        nodes = oscillatorNodeCopy
        return nodes
      break
      default:
        throw new Error();
      break
    }
  }


  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [frequency, setFrequency] = useState(440)
  const [playing, setPlaying] = useState([])

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

  const [nodes, dispatch] = useReducer(
    reducer, 
    [createNode()]
    )

  const suspendContext = () => {
    Audio.context.suspend()
  }

  useEffect(suspendContext, [])

  //change volume of individual oscillators
  const changeVolume = (e, value, i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]
    selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(value/100, Audio.context.currentTime)
    selectedOscillatorNode.gain = value
    setOscillatorNodes(oscillatorNodeCopy)
  }

  const muteAll = () => {
    const oscillatorNodeCopy = [...oscillatorNodes]

    oscillatorNodeCopy.map((node, i) => {
      node.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
      playing[i] = 'Play'
    })
    setPlaying(playing)
    setOscillatorNodes(oscillatorNodeCopy)
  }

  //change pan of individual oscillators
  const changePan = (e, value, i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]
    selectedOscillatorNode.oscillatorPanNode.setPosition(value/100, 0 ,0)
    selectedOscillatorNode.pan = value / 100
    setOscillatorNodes(oscillatorNodeCopy)
  }

  const changeFrequency = (e, value, i) => {
    let newFreq = null

    if(typeof e === 'object') {
        e = e.target.value
    }
    if(e) {
      newFreq = e
    } else {
      newFreq = 2**value
    }
    setFrequency(newFreq)
      const oscillatorNodesCopy = [...oscillatorNodes]
      const selectedOscillatorNode = oscillatorNodesCopy[i]
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(newFreq, Audio.context.currentTime)
      selectedOscillatorNode.frequency = newFreq
      setOscillatorNodes(oscillatorNodesCopy)
  }


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
      oscillatorNodes={oscillatorNodes} 
      changeVolume={changeVolume}
      muteAll={muteAll}
      changePan={changePan} 
      frequency={frequency} 
      changeFrequency={changeFrequency} 
      playPauseWrapper={playPauseWrapper} 
      playing={playing}
    />
  )
}
