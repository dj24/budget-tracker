import { useState, useCallback } from 'react';

const useComponentPosition = () => {
    const [position, setPosition] = useState(null);
  
    const onLayout = useCallback(({nativeEvent}) => {
      setPosition(nativeEvent.layout);
    }, []);
  
    return [position, onLayout];
  };

  export default useComponentPosition;