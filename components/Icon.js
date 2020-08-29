import React from 'react';
import { Text } from 'react-native';
import Svg, { Path } from "react-native-svg"

function Icon(props) {
  switch(props.type) {
    case 'plus':
      return (
        <Svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <Path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </Svg>
      )
    case 'down':
      return (
        <Svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <Path
            fillRule="evenodd"
            d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
            clipRule="evenodd"
          />
      </Svg>
      )
    case 'up':
      return (
        <Svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <Path 
            fillRule="evenodd" 
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
            clipRule="evenodd"/>
        </Svg>
      )
    default: 
        return <Text>NO ICON</Text>
  }
  
}

export default Icon
