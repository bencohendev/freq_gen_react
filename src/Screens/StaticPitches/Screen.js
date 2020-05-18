import React, {useState, useEffect} from 'react'
import Audio from '../../components/Audio'
import { ToneGenerator } from './ToneGenerator'

export const Screen = () => {

  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [oscillatorGainNodes, setOscillatorGainNodes] = useState([])
  const [playing, setPlaying] = useState([])

  //creates a new oscillator node
  const createNode = () => {

    const oscillatorNode = Audio.context.createOscillator();

    //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
    const oscillatorGainNode = Audio.context.createGain()
    const onOffNode = Audio.context.createGain()
    const panNode = Audio.context.createStereoPanner()

    //initialize node values
    oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
    onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
    panNode.pan.setValueAtTime(1, Audio.context.currentTime)

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
      gain: .5,
      pan: 1      
  }

    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setOscillatorGainNodes([...oscillatorGainNodes, oscillatorGainNode])
    setPlaying([...playing, 'Play'])
  }

  //creates an oscillator on page load
  useEffect(createNode, [])

  //change volume of individual oscillators
  const changeVolume = (value, gainNode, i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]

    selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(value/100, Audio.context.currentTime)
     selectedOscillatorNode.gain = value
     setOscillatorNodes(oscillatorNodeCopy)
  }

  //change pan of individual oscillators
  const changePan = (value, panNode, i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]
    selectedOscillatorNode.oscillatorPanNode.pan.setValueAtTime(value, Audio.context.currentTime)
     selectedOscillatorNode.pan = value * 1000
     console.log(selectedOscillatorNode.oscillatorPanNode)
     console.log(selectedOscillatorNode)

     setOscillatorNodes(oscillatorNodeCopy)
  }

  //play or pause by turning onOffNode to 1 or 0 respectively
  const playPause = (node, i) => {

    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]

    if(selectedOscillatorNode.onOffNode.gain.value === 0) {  
      if(selectedOscillatorNode.oscillatorGainNode.gain.value === 0 ) {
        selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
      }
  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(1, Audio.context.currentTime)  
      setOscillatorNodes(oscillatorNodeCopy)
      playing[i] = "Pause"
      setPlaying(playing)
  
    } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
       setOscillatorNodes(oscillatorNodeCopy)
       playing[i] = "Play"
       setPlaying(playing)
    }

  }

  return (
    <ToneGenerator createNode={createNode} oscillatorNodes={oscillatorNodes} oscillatorGainNodes={oscillatorGainNodes} setOscillatorGainNodes={setOscillatorGainNodes} changeVolume={changeVolume} changePan={changePan} playPause={playPause} playing={playing}/>
  )
}
