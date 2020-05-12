import React from 'react'
import '../css/ToneGenerator.css';
import { Slider, RangeSlider } from 'rsuite';
import {Button} from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
 

const FrequencyRangeSelector = (props) => {

    const {minFrequencyValue, updateMinFrequencyValue, maxFrequencyValue, updateMaxFrequencyValue, pitchArray} = props
    return(
        <div>


        <RangeSlider
            className='rangeSlider' 
            defaultValue={[27.5, 7902.133]}
            value={[minFrequencyValue, maxFrequencyValue]} 
        />
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

