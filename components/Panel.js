import React, {useEffect, useState} from 'react';
import { Animated, TouchableWithoutFeedback as Touchable, View, Text, LayoutAnimation } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useComponentPosition, useApp, useAnimatedValue } from '../hooks';
import PanelInner from './PanelInner';
import styles from '../styles';
import Neu from './Neu';
import chroma from 'chroma-js';

const Panel = ({onPress, budget, show = true}) => {
    const [position, onLayout] = useComponentPosition();
    const { velocity } = useApp();
    const [expand, setExpand] = useState(false)

    const handlePress = () => {
      setExpand(!expand)
    }

    return(
      <Touchable onPress={onPress}>
        {/* <Neu radius={10} style={{marginVertical: 10, opacity: show ? 1 : 0}}> */}
        <View
          onLayout={onLayout}
          style={{
            opacity: show ? 1 : 0,
            width: '100%',
            borderRadius: 12,
            // ...styles.shadow
          }}
        >
          <View style={{
            overflow: 'hidden',
            borderRadius: 12, 
            backgroundColor: budget.colour,
            height: 140, 
          }}>
            <LinearGradient
              style={{flex: 1, padding: 30}}
              colors={['rgba(255,255,255,0)','rgba(255,255,255,0)']}
            >
              <View style={{ flex: 1 }}>
                <PanelInner budget={budget}/>
              </View>
            </LinearGradient>
          </View>
        </View>
        {/* </Neu> */}
        
            
      </Touchable>
    )
  }

  export default Panel;