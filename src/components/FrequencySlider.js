import React from 'react'
import '../css/App.css';
 

const FrequencySlider = (props) => {

    const {frequencyValue, changeFrequencyValue} = props

    return(  
        <div>
            <p>Frequency Slider </p>
                <input
                    type="range"
                    min='0'
                    max='20000'
                    value={frequencyValue}
                    onChange={changeFrequencyValue}
                    className='frequency'
                />
        </div>
    )
}

export default FrequencySlider

