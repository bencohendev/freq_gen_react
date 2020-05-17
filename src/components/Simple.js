import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'


export const Simple = () => {


  const [context, setContext] = useState()
  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [oscillatorNode, setOscillatorNode] = useState()

  useEffect(() => {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
        
    var oscillatorNode = audioCtx.createOscillator();
    oscillatorNode.connect(audioCtx.destination)
   // oscillatorNode.start()
   setOscillatorNode(oscillatorNode)

    setOscillatorNodes([...oscillatorNodes, oscillatorNode])
    setContext(audioCtx)
    
  }, [])

  const createNode = () => {
    var oscillatorNode = context.createOscillator();
    oscillatorNode.connect(context.destination)
   // oscillatorNode.start()
    setOscillatorNodes([...oscillatorNodes, oscillatorNode])

  }

const play = () => {
    oscillatorNode.start()

}

const stop = () => {
  oscillatorNode.stop()
}

    return (
      <div>
        <Button
            onClick={play} 
        >
            play
        </Button>
                <Button
                onClick={stop} 
            >
                stop
            </Button>
            </div>
    )
    
}