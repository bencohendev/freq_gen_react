class Audio {
  static context = new (window.AudioContext || window.webkitAudioContext)()

  static masterGainNode = Audio.context.createGain()

  static suspendContext = Audio.context.suspend()
}

export default Audio