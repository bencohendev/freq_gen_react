import React from 'react'
import '../css/App.css';
 

const FrequencyRangeSelector = (props) => {

    const {minFrequencyValue, updateMinFrequencyValue, maxFrequencyValue, updateMaxFrequencyValue, pitchArray, instrumentSelector} = props
    return(  
        <div>
            <select
            onChange={instrumentSelector}>
                <option>
                    Select an Instrument
                </option>
                <option>
                    electric guitar
                </option>
                <option>
                    classical guitar
                </option>
                <option>
                    Bb saxophone
                </option>
            </select>
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

