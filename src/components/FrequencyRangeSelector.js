import React from 'react'
import '../css/ToneGenerator.css';
 

const FrequencyRangeSelector = (props) => {

    const {minFrequencyValue, updateMinFrequencyValue, maxFrequencyValue, updateMaxFrequencyValue, pitchArray} = props
    
    return(  
        <div>
            <select
                value={minFrequencyValue}
                onChange={updateMinFrequencyValue}
            >
            {
                pitchArray.map((pitch, index) => {
                    if(pitch < maxFrequencyValue){
                    return(                    
                    <option key={index}>
                        {Math.round(pitch)}
                    </option>
                    )
                 }
                })
            }
            </select>
            <select
                value={maxFrequencyValue}
                onChange={updateMaxFrequencyValue}
            >
                {
                pitchArray.map((pitch, index) => {
                    if(pitch > minFrequencyValue)
                    return(
                        <option key={index}>
                            {Math.round(pitch)}
                        </option>
                    )
                })
                }
            </select>

        </div>
    )
}

export default FrequencyRangeSelector

