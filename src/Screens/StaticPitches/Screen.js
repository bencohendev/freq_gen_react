import React, {useState, useEffect} from 'react'
import Audio from '../../components/Audio'
import { ToneGenerator } from './ToneGenerator'

export const Screen = () => {

  //const [context, setContext] = useState()
  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [oscillatorGainNodes, setOscillatorGainNodes] = useState([])
  const [playing, setPlaying] = useState(null)

  const createNode = () => {

    const oscillatorGainNode = Audio.context.createGain()
    const onOffNode = Audio.context.createGain()

    oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
    onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)

    oscillatorGainNode.connect(onOffNode)

   
    const oscillatorNode = Audio.context.createOscillator();

  //  oscillatorNode.connect(Audio.context.destination)
    oscillatorNode.connect(oscillatorGainNode)


    

    onOffNode.connect(Audio.context.destination)

    oscillatorNode.start()
    //oscillatorNode.suspend()

    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      onOffNode: onOffNode,
      oscillatorGainNode: oscillatorGainNode,
      frequency: oscillatorNode.frequency.value,
      type: oscillatorNode.type,
      gain: .5
      
  }

    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setOscillatorGainNodes([...oscillatorGainNodes, oscillatorGainNode])
  }

  useEffect(createNode, [])



  const changeVolume = (value, gainNode, i) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]

    selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(
      value/100, Audio.context.currentTime
    )
     selectedOscillatorNode.gain = value
     setOscillatorNodes(oscillatorNodeCopy)
  }

  const play = (node, i) => {

    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[i]

    if(selectedOscillatorNode.onOffNode.gain.value === 0) {  
      console.log(selectedOscillatorNode.oscillatorGainNode.gain.value)
      if(selectedOscillatorNode.oscillatorGainNode.gain.value === 0 ) {
        selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(
          .5, Audio.context.currentTime
        )
      }
  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(
        1, Audio.context.currentTime
      )  
       setOscillatorNodes(oscillatorNodeCopy)
       setPlaying('Pause')
  
    } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
  
      selectedOscillatorNode.onOffNode.gain.setValueAtTime(
        0, Audio.context.currentTime
      )
       setOscillatorNodes(oscillatorNodeCopy)
       setPlaying('Play')
    }

    }



  const stop = (node, i) => {

  }



  return (
    <ToneGenerator createNode={createNode} oscillatorNodes={oscillatorNodes} oscillatorGainNodes={oscillatorGainNodes} setOscillatorGainNodes={setOscillatorGainNodes} changeVolume={changeVolume} play={play} stop={stop} playing={playing}/>
  )
}
