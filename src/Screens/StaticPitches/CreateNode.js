  //creates a new oscillator node
  export const CreateNode = (freq, series) => {

    const context = new (window.AudioContext || window.webkitAudioContext)()

  
    const oscillatorNode = context.createOscillator();
    //create nodes. oscillatorGainNode used for volume control. onOffNode used for playing and pausing. Pan Node for panning
    const oscillatorGainNode = context.createGain()
    const seriesGainNode = context.createGain()
    const onOffNode = context.createGain()
    const panNode = context.createPanner()
  
    //initialize node values
    oscillatorGainNode.gain.setValueAtTime(.5, context.currentTime)
    seriesGainNode.gain.setValueAtTime(series, context.currentTime)
    onOffNode.gain.setValueAtTime(0, context.currentTime)      
    panNode.panningModel = 'equalpower'
    panNode.setPosition(0, 0, 0)
  
    //connect node chain
    oscillatorNode.connect(oscillatorGainNode)
    oscillatorGainNode.connect(seriesGainNode)
    seriesGainNode.connect(onOffNode)   
    onOffNode.connect(panNode)
    panNode.connect(context.destination)
  
  
    oscillatorNode.start()
  
    oscillatorNode.frequency.setValueAtTime(freq, context.currentTime)
  
  
    //saves oscillator values as object that can be manipulated later
    const oscillatorNodeValues = {
      oscillatorNode: oscillatorNode,
      oscillatorGainNode: oscillatorGainNode,
      seriesGainNode: seriesGainNode,
      onOffNode: onOffNode,
      oscillatorPanNode: panNode,
      frequency: freq,
      type: oscillatorNode.type,
      gain: 50,
      pan: 0,
      playing: 'Play',
  }
  return oscillatorNodeValues
  }