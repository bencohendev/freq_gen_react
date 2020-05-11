import React from 'react';
import  '../css/FrequencySelector.css'
import Button from 'react-bootstrap/Button'

 const FrequencySelector = (props) => {

    const pitches = [27.5, 29.135, 30.868, 32.703, 34.648, 36.708, 38.891, 40.203, 43.464, 46.249, 48.999, 51.913]
    const pitchNames = ['a', 'a#', 'b', 'c' , 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#']

   return (
       <div>
            <div className='pitch-row'>
                {
                pitches.map((pitch, index) => (
                <Button 
                    variant="dark"
                    size="sm"
                    className="pitch-btn"
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
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*2)}
                >
                    {pitchNames[index]}1
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*4)}
                >
                    {pitchNames[index]}2
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*8)}
                >
                    {pitchNames[index]}3
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*16)}
                >
                    {pitchNames[index]}4
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*32)}
                >
                    {pitchNames[index]}5
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*64)}
                >
                    {pitchNames[index]}6
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*128)}
                >
                    {pitchNames[index]}7
                </Button>
                ))
                }
            </div>
            <div className='pitch-row'>
                {    
                pitches.map((pitch, index) => (
                    <Button
                    variant="dark"
                    size="sm"
                    className="pitch-btn"

                    key={index}
                    onClick={() => props.changeFrequencyValue(pitch*256)}
                >
                    {pitchNames[index]}8
                </Button>
                ))
                }
            </div>

        </div>

     )

    }


    export default FrequencySelector