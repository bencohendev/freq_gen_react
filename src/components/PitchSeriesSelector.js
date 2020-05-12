import React from 'react'
import '../css/App.css';

const PitchSeriesSelector = (props) => {

    const {updateNumberOfPitches, updateBpm, updateInfinitePitchSets} = props

    return (
        <div>
            <input 
                type='number'
                placeholder='number of pitches'
                onChange={updateNumberOfPitches}
            />
            <input 
                type='number'
                placeholder='bpm'
                onChange={updateBpm}
            />
            <div>Check to only play one pitch set</div>
            <input
                type='checkbox'
                onChange={updateInfinitePitchSets}
            />
        </div>
    )
}

export default PitchSeriesSelector