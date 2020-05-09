import React from 'react';
import  '../css/FrequencySelector.css'
import Button from 'react-bootstrap/Button'

 const FrequencySelector = (props) => {

    const pitches = [27.5, 29.135, 30.868, 32.703, 34.648, 36.708, 38.891, 40.203, 43.464, 46.249, 48.999, 51.913]
    const pitchNames = ['a', 'a#/Bb', 'b', 'c' , 'c#/db', 'd', 'd#/eb', 'e', 'f', 'f#/Gb', 'g', 'g#/ab']

   return (
       <div>
        <div className='pitch-row'>
            {
            pitches.map((pitch, index) => (
                <Button
                key={index}
                onClick={() => props.changeFrequencyValue(pitch)}
            >
                {pitchNames[index]}0
            </Button>
            ))
            }
            </div>
           
            <div className='pitch-row'>            {    
            pitches.map((pitch, index) => (
                <button
                key={index}
                onClick={() => props.changeFrequencyValue(pitch*2)}
            >
                {pitchNames[index]}1
            </button>
            ))
            }
</div>
<div className='pitch-row'>
            {    
            pitches.map((pitch, index) => (
                <button
                key={index}
                onClick={() => props.changeFrequencyValue(pitch*4)}
            >
                {pitchNames[index]}2
            </button>
            ))
            }
</div>
<div className='pitch-row'>
            {    
            pitches.map((pitch, index) => (
                <button
                key={index}
                onClick={() => props.changeFrequencyValue(pitch*8)}
            >
                {pitchNames[index]}3
            </button>
            ))
            }
</div>
<div className='pitch-row'>
            {    
            pitches.map((pitch, index) => (
                <button
                key={index}
                onClick={() => props.changeFrequencyValue(pitch*16)}
            >
                {pitchNames[index]}4
            </button>
            ))
            }
            </div>
        </div>

     )

    }


    export default FrequencySelector