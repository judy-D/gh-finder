import { useState, useEffect } from 'react';


const useDebounced = ( value : string) => {
    let [ debouncedValue, setDebouncedValue ] = useState(value);
  
    useEffect(() => {
  
        let timeoutId = setTimeout(() => {
          // console.log('Setting the value ' + value?.length)
          setDebouncedValue(value);
        }, 500);
    
        return () => {
          // console.log('Reset value')
          clearTimeout(timeoutId)
        }
     
    }, [value])
  
    return debouncedValue
  }

export default useDebounced