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
                pitchArray.map((pitchObject, index) => {
                    if(pitchObject.frequency < maxFrequencyValue){
                    return(                    
                    <option
                        key={index}
                        value={pitchObject.frequency}                        
                    >                        
                        {pitchObject.pitch}
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
                pitchArray.map((pitchObject, index) => {
                    if(pitchObject.frequency > minFrequencyValue)
                    return(
                        <option 
                            key={index}
                            value={pitchObject.frequency}                        
                        >
                            {pitchObject.pitch}
                        </option>
                    )
                })
                }
            </select>

        </div>
    )
}

export default FrequencyRangeSelector

