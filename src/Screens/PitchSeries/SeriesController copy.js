import React, {useState, useEffect} from 'react'
import Audio from '../../components/Audio'
import { SeriesPlayer } from './SeriesPlayer'

export const SeriesController = () => {

  const [oscillatorNodes, setOscillatorNodes] = useState([])
  const [oscillatorNode, setOscillatorNode] = useState()
  const [oscillatorGainNodes, setOscillatorGainNodes] = useState([])
  const [frequency, setFrequency] = useState(440)
  const [minFrequencyValue, setMinFrequencyValue] = useState(440)
  const [maxFrequencyValue, setMaxFrequencyValue] = useState(440)
  const [pitchArray, setPitchArray] = useState([])
  const [selectedFreqArray, setSelectedFreqArray] = useState([])
  const [bpm, setBpm] = useState(1000)
  const [numberOfPitches, setNumberOfPitches] = useState(1) 
  const [infinitePitchSets, setInfinitePitchSets] = useState(true)

  const [playing, setPlaying] = useState('Play')
  const [isPlaying, setIsPlaying] = useState(false)

  const createNode = () => {
    const oscillatorNode = Audio.context.createOscillator();

    //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
    const oscillatorGainNode = Audio.context.createGain()
    const onOffNode = Audio.context.createGain()
    const seriesGainNode = Audio.context.createGain()
    const panNode = Audio.context.createPanner()

    //initialize node values
    oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
    seriesGainNode.gain.setValueAtTime(0, Audio.context.currentTime)      
    onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)      
    panNode.panningModel = 'equalpower'
    panNode.setPosition(0, 0, 0)

    //connect node chain
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorGainNode.connect(seriesGainNode)
    seriesGainNode.connect(onOffNode)   
    onOffNode.connect(panNode)
    panNode.connect(Audio.context.destination)

    oscillatorNode.start()

    //saves oscillator values as object that can be manipulated later
    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      onOffNode: onOffNode,
      oscillatorGainNode: oscillatorGainNode,
      seriesGainNode: seriesGainNode,
      oscillatorPanNode: panNode,
      frequency: oscillatorNode.frequency.value,
      type: oscillatorNode.type,
      gain: 50,
      pan: 0      
  }
 
    setOscillatorNode(oscillatorNodeValues)
    setOscillatorNodes([...oscillatorNodes, oscillatorNodeValues])
    setOscillatorGainNodes([...oscillatorGainNodes, oscillatorGainNode])
    //setPlaying([...playing, 'Play'])
  }

  //creates an oscillator on page load
  useEffect(createNode, [])

  const populateAllPitches = () => {
    let fundamentalPitches = [32.703, 34.648, 36.708, 38.891, 41.203, 43.454, 46.249, 48.999, 51.913, 55, 58.270, 61.735]
    const pitchNames = ['c' , 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
    let allPitches = []
    let pitchMultiplier = 1

    for(let i=1; i<=9; i++) {
        for(let j=0; j<=fundamentalPitches.length-1; j++){         
            allPitches.push({pitch: pitchNames[j]+i, frequency: fundamentalPitches[j]*pitchMultiplier})
        }
        pitchMultiplier = pitchMultiplier*2
    }
    setPitchArray(allPitches)
    setSelectedFreqArray(allPitches)
}

useEffect(populateAllPitches, [])

  //change volume of individual oscillators
  const changeVolume = (e, value) => {
    const oscillatorNodeCopy = [...oscillatorNodes]
    const selectedOscillatorNode = oscillatorNodeCopy[0]
    selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(value/100, Audio.context.currentTime)
    selectedOscillatorNode.gain = value
    setOscillatorNodes(oscillatorNodeCopy)
  }

  const updateMinFrequencyValue = (e) => {
    if(typeof e === 'object') {
        e = e.target.value
    }
    setMinFrequencyValue(e)
    const filteredPitchArray = pitchArray.filter((pitchObject) => {
        if( (pitchObject.frequency > e) && (pitchObject.frequency < maxFrequencyValue) ) {
            return true
        }
    })
   setSelectedFreqArray(filteredPitchArray)
}

 const updateMaxFrequencyValue = (e) => {
    if(typeof e === 'object') {
        e = e.target.value
    }
    setMaxFrequencyValue(e)
    const filteredPitchArray = pitchArray.filter((pitchObject) => {
         if((pitchObject.frequency < e) && (pitchObject.frequency > minFrequencyValue) ) {
             return true
         }
    })
  setSelectedFreqArray(filteredPitchArray)
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
    oscillatorNode.oscillatorNode.frequency.setValueAtTime(newFreq, Audio.context.currentTime)
    setOscillatorNode(oscillatorNode)    
  }

  const instrumentSelector = (e) => {
    const instrument = e.target.value

    switch (instrument) {
        case 'Electric Guitar':
           updateMinFrequencyValue(82.406)
           updateMaxFrequencyValue(1174.656)
       break;
       case 'Bb Saxophone':
           updateMinFrequencyValue(207.652)
           updateMaxFrequencyValue(2092.992)
       break;
       case 'Test' :
           updateMinFrequencyValue(440)
           updateMaxFrequencyValue(1174.656)
       break;
       default:
         updateMinFrequencyValue(440)
         updateMaxFrequencyValue(480)

    }
} 


 const updateBpm = (e) => {
  setBpm(60/e.target.value*1000)
}

const updateNumberOfPitches = (e) => {
  setNumberOfPitches(e.target.value)
}

const updateInfinitePitchSets = (e) => {
   if (e.target.checked) {
      setInfinitePitchSets(false)
   } else {
       setInfinitePitchSets(true)
   }
}

//this effect starts and stops the tone generator
useEffect(() => {
  let intervalID = null
  if( (isPlaying) ) {
      if(infinitePitchSets){
          let i=0
          intervalID = setInterval(() => {
              i++
              if(i===parseInt(numberOfPitches)+1) {
                oscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                  i=0
              } else {
                  const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
                  changeFrequency(pitchToPlay.frequency)
                  oscillatorNode.seriesGainNode.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
              }
              setTimeout(() => {
                oscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
              }, (bpm - (bpm/4)));
          }, (bpm));
          
          return () => clearInterval(intervalID)
      }
      if(!infinitePitchSets){
          const playTheDangThing = (i) => {
              if(i<numberOfPitches) {
              setTimeout(() => {
                  const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
                      changeFrequency(pitchToPlay.frequency)
                      oscillatorNode.seriesGainNode.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
                  
                  setTimeout(() => {
                    oscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                      }, (bpm - (bpm/4)));

                  }, (bpm*i));
                  i++
              } else{
              setTimeout(() => {
                  setPlaying('Play')
                  setIsPlaying(false)
                  oscillatorNode.seriesGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
                  return
                  }, (bpm*i));
              }    
          }    
          for( let i =0; i <= numberOfPitches; i++ ) {            
              playTheDangThing(i)
          }
      }
      return () => clearInterval(intervalID)
  }

  if( !isPlaying ) {
      window.clearInterval(intervalID)
      Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
  } 

}, [isPlaying, selectedFreqArray, bpm, numberOfPitches, setIsPlaying, infinitePitchSets, oscillatorNode])

//play or pause by turning onOffNode to 1 or 0 respectively
  const playPause = () => {
    if(Audio.context.state === 'suspended') {
    Audio.context.resume()
    .then(() => {      
      actualPlayPause()      
  })
  } else {
    actualPlayPause()
    
  }
  }

  const actualPlayPause = () => {
    if(oscillatorNode.onOffNode.gain.value === 0) {       
      oscillatorNode.onOffNode.gain.setValueAtTime(1, Audio.context.currentTime)  
      setOscillatorNode(oscillatorNode)
      setPlaying('Pause')
      setIsPlaying(true)
  
     } else if(oscillatorNode.onOffNode.gain.value > 0) {
      oscillatorNode.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)  
      setOscillatorNode(oscillatorNode)
      setPlaying('Play')
      setIsPlaying(false)
     }
   }


  return (
    <SeriesPlayer 
      oscillatorNode={oscillatorNode} 
      oscillatorNodes={oscillatorNodes} 
      oscillatorGainNodes={oscillatorGainNodes} 
      setOscillatorGainNodes={setOscillatorGainNodes} 
      changeVolume={changeVolume}  
      frequency={frequency} 
      changeFrequency={changeFrequency} 
      playPause={playPause} playing={playing} 
      minFrequencyValue={minFrequencyValue}
      updateMinFrequencyValue={updateMinFrequencyValue} 
      maxFrequencyValue={maxFrequencyValue} 
      updateMaxFrequencyValue={updateMaxFrequencyValue} 
      pitchArray={pitchArray} 
      instrumentSelector={instrumentSelector} 
      updateNumberOfPitches={updateNumberOfPitches} 
      updateBpm={updateBpm} 
      updateInfinitePitchSets={updateInfinitePitchSets} 
    />
  )
}



//this effect starts and stops the tone generator
// useEffect(() => {
//   let intervalID = null
//   if( (isPlaying) ) {
//       if(infinitePitchSets){
//           let i=0
//           intervalID = setInterval(() => {
//               i++
//               if(i===parseInt(numberOfPitches)+1) {
//                   Audio.onOffNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
//                   i=0
//               } else {
//                   const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
//                   changeFrequency(pitchToPlay.frequency)
//                   Audio.onOffNode.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
//               }
//               setTimeout(() => {
//                   Audio.onOffNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
//               }, (bpm - (bpm/4)));
//           }, (bpm));
          
//           return () => clearInterval(intervalID)
//       }
//       if(!infinitePitchSets){
//           const playTheDangThing = (i) => {
//               if(i<numberOfPitches) {
//               setTimeout(() => {
//                   const pitchToPlay = selectedFreqArray[Math.floor(Math.random() * selectedFreqArray.length)]
//                       changeFrequency(pitchToPlay.frequency)
//                       Audio.onOffNode.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
                  
//                   setTimeout(() => {
//                           Audio.onOffNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
//                       }, (bpm - (bpm/4)));

//                   }, (bpm*i));
//                   i++
//               } else{
//               setTimeout(() => {
//                   setPlaying('Play')
//                   setIsPlaying(false)
//                   Audio.onOffNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
//                   return
//                   }, (bpm*i));
//               }    
//           }    
//           for( let i =0; i <= numberOfPitches; i++ ) {            
//               playTheDangThing(i)
//           }
//       }
//       return () => clearInterval(intervalID)
//   }

//   if( !isPlaying ) {
//       window.clearInterval(intervalID)
//       Audio.masterGainNode.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
//   } 

// }, [isPlaying, selectedFreqArray, bpm, numberOfPitches, setIsPlaying, infinitePitchSets])

// const playOrPause = (playing) => {    
//   if( (playing === 'Play') || !playing ) {
//       setPlaying('Pause')
//       if(Audio.context.state === 'suspended') {
//           Audio.context.resume()
//           .then(() => {
//               setIsPlaying(true)
//           })

//       } else {
//           setIsPlaying(true)
//       }
//   } 

//   else if(playing === 'Pause') {
//       setPlaying('Play')
//       setIsPlaying(false)
//   }
// }
// const actualPlayPause = (node, i) => {
//   const oscillatorNodeCopy = [...oscillatorNodes]
//   const selectedOscillatorNode = oscillatorNodeCopy[i]

//   if(selectedOscillatorNode.onOffNode.gain.value === 0) {  
//     if(selectedOscillatorNode.oscillatorGainNode.gain.value === 0 ) {
//       selectedOscillatorNode.oscillatorGainNode.gain.setValueAtTime(.5, Audio.context.currentTime)
//     }

//     selectedOscillatorNode.onOffNode.gain.setValueAtTime(1, Audio.context.currentTime)  
//     setOscillatorNodes(oscillatorNodeCopy)
//     playing[i] = "Pause"
//     setPlaying(playing)

//   } else if(selectedOscillatorNode.onOffNode.gain.value > 0) {

//     selectedOscillatorNode.onOffNode.gain.setValueAtTime(0, Audio.context.currentTime)
//      setOscillatorNodes(oscillatorNodeCopy)
//      playing[i] = "Play"
//      setPlaying(playing)
//   }
// }