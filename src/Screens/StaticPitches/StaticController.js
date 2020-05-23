import React, {useState, useEffect} from 'react'
import Audio from '../../components/Audio'
import { StaticPlayer } from './StaticPlayer'

export const StaticController = () => {

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
  }
    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setPlaying([...playing, 'Play'])
  }

  //creates an oscillator on page load
  useEffect(createNode, [])

  const suspendContext = () => {
    Audio.context.suspend()
  }

  useEffect(suspendContext, [])

  const deleteOscillator = (i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const deletedNode = oscillatorNodeCopy.splice(i, 1)
    if(deletedNode[0].onOffNode.gain.value > 0){
      actualPlayPause(deletedNode, i)
    }
    playing.splice(i, 1)
    setPlaying(playing)
    setOscillatorNodes(oscillatorNodeCopy)
  }

const changeOscillatorType = (e, value, i) => {  
  const oscillatorNodeCopy = [...oscillatorNodes]
  const selectedOscillatorNode = oscillatorNodeCopy[i]
  const oscillatorType = e.target.value.toLowerCase()
  selectedOscillatorNode.oscillatorNode.type = oscillatorType
  setOscillatorNodes(oscillatorNodeCopy)  
}

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
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]
    if(selectedOscillatorNode.onOffNode.gain.value === 0) {  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(1, Audio.context.currentTime)
      playing[i] = "Pause" 
      setPlaying(playing)
      setOscillatorNodes(oscillatorNodeCopy)
    } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
      playing[i] = "Play"
      setPlaying(playing)
      setOscillatorNodes(oscillatorNodeCopy)
    }
  }

  return (
    <StaticPlayer 
    createNode={createNode} 
    deleteOscillator={deleteOscillator}
    changeOscillatorType={changeOscillatorType}
    oscillatorNodes={oscillatorNodes} 
    changeVolume={changeVolume}
    muteAll={muteAll}
    changePan={changePan} 
    frequency={frequency} 
    changeFrequency={changeFrequency} 
    playPauseWrapper={playPauseWrapper} 
    playing={playing}/>
  )
}
