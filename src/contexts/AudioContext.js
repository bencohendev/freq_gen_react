import React, {useContext} from 'react'

export const AudioContext = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)()

    return(null)
}

