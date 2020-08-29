import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import Neu from './Neu';

const Button = ({children, onPress, ...props}) => { 

  return(
    <TouchableWithoutFeedback onPress={onPress}>
      <Neu {...props}>
        <View style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 20
        }}>
          {children}
        </View>
      </Neu>
    </TouchableWithoutFeedback>
  )
}

  export default Button;