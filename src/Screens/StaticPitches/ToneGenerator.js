import React from 'react'
import Button from 'react-bootstrap/Button'


export const ToneGenerator = (props) => {

  const { createNode, oscillatorNodes, changeVolume, changePan, playPause, playing } = props
  
  return (
    <div>
      <div className="oscillator-controls">
        {oscillatorNodes.map((node, i)=>(
          <div 
            key={i}
            className="play"        
          >
            <Button
              key={`start-${i}`}
              onClick={()=> playPause(node, i)}
            >
              {playing[i] === 'Play'
                ? 'Play'
                : 'Pause'}
            </Button>

            <div key={`volume-${i}`}>
              <p>Volume</p>
              <input
                  type="range"
                  min='0'
                  max='100'
                  onChange={(e)=>changeVolume(e.target.value, node, i)}
                  className='volume'
              />
            </div>
            <div key={`pan-${i}`}>
              <p>Pan</p>
              <input
                type="range"
                min="-1000"
                max="1000"
                onChange={(e)=>changePan(e.target.value, node, i)}
              />
            </div>

          </div>
        ))}

      </div>
      <Button
        onClick={createNode}
      >
        Create New Node
      </Button>
    </div>
  )  
}


