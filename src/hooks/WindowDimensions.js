import { useState, useEffect } from 'react';

function getWindowDimensions() {
  let el = document.getElementsByClassName('oscillator-container')
  if(el[0]){
    return {
      width: el[0].clientWidth      
    };
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  let el = document.getElementsByClassName('oscillator-container')
  
  useEffect(() => {
    if(el[0]){
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }
  }, []);

  return windowDimensions;
}