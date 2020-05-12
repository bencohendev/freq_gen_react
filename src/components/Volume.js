import React from 'react'
import '../css/App.css';
 

const Volume = (props) => {
    return(  
        <div>
            <p>Component Volume: </p>
                <input
                    type="range"
                    min='0'
                    max='100'
                    value={props.masterGainValue * 100}
                    onChange={props.changeMasterVolume}
                    className='pad-volume'
                />
        </div>
    )
}

export default Volume