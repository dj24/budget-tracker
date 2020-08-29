import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, Text, Animated } from 'react-native';
import Neu from './Neu';
import theme from '../theme';
import { useAnimatedValue } from '../hooks';

const Button = ({children, onPress, style, active}) => { 
  const colourAnim = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(colourAnim, {
      toValue: active ? 0 : 1,
      duration: 200,
      useNativeDriver: false, 
    }).start();
  },[active])

  return(
    <TouchableOpacity onPress={onPress}>
        <Animated.View style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: colourAnim.interpolate({
            inputRange: [0,1],
            outputRange: [theme.link, theme.grey]
          }),
          borderRadius: 999,
          ...style
        }}
        >
          <Animated.Text style={{
          color: colourAnim.interpolate({
            inputRange: [0,1],
            outputRange: ['white', theme.link]
          }),
          fontWeight: '600'}}>
            {children}
          </Animated.Text>
        </Animated.View>
    </TouchableOpacity>
  )
}

  export default Button;