import React, {useState} from 'react'
import Audio from './Audio'
import '../css/SynthPad.css';
 

const Volume = (props) => {

    const { value, changeMasterVolume } = props

    return(  
        <div>
            <p>Master Volume: </p>
                <input
                    type="range"
                    min='0'
                    max='100'
                    value={value*100}
                    onChange={()=>props.changeMasterVolume()}
                    className='pad-volume'
                />
        </div>
    )
}

export default Volume