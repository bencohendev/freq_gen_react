import React, {useState, useEffect,useLayoutEffect, useReducer} from 'react'
import { StaticPlayer } from './StaticPlayer'


export const StaticController = (props) => {

  const {context, pitchArray} = props

  
  const [fundamental, setFundamental] = useState(207.652)
  const [freqState, setFreqState] = useState(440)
  const [playState, setPlayState] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const startAnimation = (i, freq, playing) => {
 
    let canvasClass = 'canvas-'+i
    let canvas = document.getElementsByClassName(canvasClass)
  
    if(canvas[0].height) {
 
      function plotSine(ctx, xOffset) {
        if(playing === 'Play'){
          ctx.clearRect(0, 0, 10000, 5000);
          return
        } else {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
  
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(63,81,181, .5)";
  
        
        let x = -1;
        let y = 1000;
        let amplitude = height/4;
        let frequency = freqState/100;
        ctx.moveTo(x, 50);
        while (x < width) {
            y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
            ctx.lineTo(x, y);
            x++;
        }
        ctx.stroke();
        ctx.restore();
      }
    }
      function draw() {
        if(playState){
        let context = canvas[0].getContext("2d");    
        context.clearRect(0, 0, 10000, 5000);
        context.save();
        plotSine(context, step);
        context.restore();    
        step += 4;
        window.requestAnimationFrame(draw);
      }
    }
      let step = -4;
      window.requestAnimationFrame(draw);
      return
    }
  }

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
        setPlayState(true)
        startAnimation(action.i, selectedOscillatorNode.frequency, selectedOscillatorNode.playing)
      } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {
        selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, context.currentTime)   
        selectedOscillatorNode.playing = "Play"
        setPlayState(false)
        startAnimation(action.i, selectedOscillatorNode.frequency, selectedOscillatorNode.playing)
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
      setFreqState(selectedOscillatorNode.frequency)
      startAnimation(action.i, selectedOscillatorNode.frequency, selectedOscillatorNode.playing)
      nodes = oscillatorNodeCopy
      return nodes
    

    case 'frequency-select':
      selectedOscillatorNode.oscillatorNode.frequency.setValueAtTime(action.value, context.currentTime)
      selectedOscillatorNode.frequency = action.value
      startAnimation(action.i, selectedOscillatorNode.frequency, selectedOscillatorNode.playing)
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


  function getWindowDimensions() {
    let el = document.getElementsByClassName('oscillator-container')
   
    if(el[0]){
      return {
        width: el[0].clientWidth,
        height: el[0].clientHeight
    }
 
  }    
}
    useLayoutEffect(() => {
      setWindowDimensions(getWindowDimensions());
    }, []);
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }  
      window.addEventListener('resize', handleResize);  
      return () => window.removeEventListener('resize', handleResize);    
    }, []);
  
  return (
    <StaticPlayer 
      dispatch={dispatch}
      nodes={nodes}
      overtonePreset={overtonePreset}
      playPauseWrapper={playPauseWrapper} 
      pitchArray={pitchArray}
      fundamentalSetter={fundamentalSetter}
      windowDimensions={windowDimensions}
    />
  )
}
