import React, {useState, useEffect} from 'react'
import Audio from '../../components/Audio'
import { StaticPlayer } from '../StaticPitches/StaticPlayer'

export const SeriesController = () => {

  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [oscillatorGainNodes, setOscillatorGainNodes] = useState([])
  const [frequency, setFrequency] = useState(440)
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
    panNode.pan.setValueAtTime(0, Audio.context.currentTime)

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
      pan: 0      
  }

    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setOscillatorGainNodes([...oscillatorGainNodes, oscillatorGainNode])
    setPlaying([...playing, 'Play'])
  }

  //creates an oscillator on page load
  useEffect(createNode, [])

  const deleteOscillator = (i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const deletedNode = oscillatorNodeCopy.splice(i, 1)
    if (deletedNode[0].onOffNode.gain.value > 0){
      actualPlayPause(deletedNode, i)
    }
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

  //change pan of individual oscillators
  const changePan = (e, value, i) => {
    console.log(value)
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]
    selectedOscillatorNode.oscillatorPanNode.pan.setValueAtTime(value / 100, Audio.context.currentTime)
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
    }

    if (value) {
      newFreq = value
    }

    setFrequency(newFreq)
        const oscillatorNodesCopy = [...oscillatorNodes]
        const selectedOscillatorNode = oscillatorNodesCopy[i]
        selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(newFreq, Audio.context.currentTime)
        setOscillatorNodes(oscillatorNodesCopy)
    
  }

  //play or pause by turning onOffNode to 1 or 0 respectively
  const playPause = (node, i) => {
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
    <StaticPlayer createNode={createNode} deleteOscillator={deleteOscillator} oscillatorNodes={oscillatorNodes} oscillatorGainNodes={oscillatorGainNodes} setOscillatorGainNodes={setOscillatorGainNodes} changeVolume={changeVolume} changePan={changePan} frequency={frequency} changeFrequency={changeFrequency} playPause={playPause} playing={playing}/>
  )
}
