import React from 'react'
import Button from 'react-bootstrap/Button'


export const ToneGenerator = (props) => {

  const { createNode, oscillatorNodes, changeVolume, play, playing } = props
  
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
              onClick={()=> play(node, i)}
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


