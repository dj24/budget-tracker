import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles';
import theme from '../theme';

const shadowOffset = 5;
const shadowRadius = 4;

const DarkShadowInset = ({radius, children, dark}) => (
  <View style={{
    borderRadius: radius,
    overflow: 'hidden',
    shadowColor: dark,
    borderColor: theme.bg,
    borderWidth: 5,
    shadowOffset: {
      width: shadowOffset,
      height: shadowOffset * 0.8,
    },
    shadowRadius: shadowRadius,
    shadowOpacity: 1,
  }}>
    {children}
  </View>
)

const LightShadowInset = ({radius, children, light}) => (
  <View style={{
    borderRadius: radius,
    borderColor: theme.bg,
    borderWidth: 5,
    overflow: 'hidden',
    shadowColor: light,
    shadowOffset: {
      width: -shadowOffset,
      height: -shadowOffset * 0.8,
    },
    shadowRadius: shadowRadius,
    shadowOpacity: 1,
  }}
  >
    {children}
  </View>
)

const DarkShadow = ({radius, children, dark}) => (
  <View style={{
    borderRadius: radius,
    backgroundColor: theme.bg,
    shadowColor: dark,
    shadowOffset: {
      width: shadowOffset,
      height: shadowOffset * 0.8,
    },
    shadowRadius: shadowRadius,
    shadowOpacity: 1,
  }}>
    {children}
  </View>
)

const LightShadow = ({radius, children, light}) => (
  <View style={{
    borderRadius: radius,
    backgroundColor: theme.bg,
    shadowColor: light,
    shadowOffset: {
      width: -shadowOffset,
      height: -shadowOffset * 0.8,
    },
    shadowRadius: shadowRadius,
    shadowOpacity: 1,
  }}
  >
    {children}
  </View>
)

const Inner = ({children, active, radius}) => (
  <View style={{
    flexDirection: 'row',
    paddingHorizontal: 0, 
    paddingVertical: 0,
    borderRadius: radius,
    overflow: 'hidden'
    // transform: [
    //   {
    //     scale: active ? 0.95 : 1
    //   }
    // ]
  }}>
    {children}
  </View>
)

const Neu = ({radius = 30, children, active, light = '#fff', dark =  '#d1d9e6', ...props}) => { 
  const Light = active ? LightShadowInset : LightShadow;
  const Dark = active ? DarkShadowInset : DarkShadow;

  return(
    <View {...props}>
      <View style={{
        margin: active ? -10 : 0,
      }}>
        <Light radius={radius} light={light}>
          <Dark radius={radius} dark={dark}>
            <Inner active={active} radius={radius}>
              {children}
            </Inner>
          </Dark>
        </Light>
      </View>
    </View>
  )
}

  export default Neu;