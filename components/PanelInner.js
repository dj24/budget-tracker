import React, { useEffect, useState } from 'react';
import { View, Text, LayoutAnimation, Animated, Easing } from 'react-native';

import AnimateNumber from 'react-native-countup'
import { useAnimatedValue, useApp } from '../hooks';

const PanelInner = ({expanded = false,  budget}) => {
    const expandAnim = useAnimatedValue(0);
    const progressAnim = useAnimatedValue(budget.progress);

    useEffect(() => {
        Animated.timing(
            expandAnim,
            {
              toValue: expanded ? 1 : 0,
              easing: Easing.bezier(0.25, 1, 0.5, 1),
              duration: 600,
              useNativeDriver: false
            }
          ).start();
    },[expanded])

    useEffect(() => {
        Animated.spring(
            progressAnim,
            {
            toValue: budget.progress,
            duration: 400,
            useNativeDriver: false
            }
        ).start();
      },[budget])

    return (
    <>
    <View style={{flex: 1, 
        paddingTop: expanded ? 30 : 0,
        flexDirection: expanded ? 'column' : 'row', 
        alignItems: expanded ? 'center' : 'flex-start',
        justifyContent: expanded ? 'center' : 'space-between',
    }}>
        <View style={{
            flexDirection: 'row', 
            alignItems: 'center',
        }}>
            {/* {!expanded && <View style={{backgroundColor: 'rgba(255,255,255,0.33)', borderRadius: 10, height: 48, width: 48, padding:8}}>
                <Icon fill='white' type='up'/>
                </View>} */}
            <View>
                <Animated.Text style={{fontSize: 20, 
                    color: 'white', 
                    fontFamily: 'System', 
                    fontWeight: 'bold', 
                    opacity: expandAnim.interpolate({
                        inputRange: [0,1],
                        outputRange: [1,0.66]
                    })
                    }}>{budget.name}</Animated.Text>
                {!expanded && <Text style={{fontSize: 16, color: 'white', fontFamily: 'System', opacity:0.66}}>10 Transactions</Text>}
            </View>
        </View>
      
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Animated.View style={{
                opacity: expandAnim.interpolate({
                    inputRange: [0,1],
                    outputRange: [0.75,1]
                })
            }}
            >
                <Animated.Text style={{
                    fontSize: expandAnim.interpolate({
                        inputRange: [0,1],
                        outputRange: [16,48]
                    }),
                    color: 'white', 
                    fontFamily: 'System',
                    marginTop: expanded ? 5 : 0,
                    fontVariant: ['tabular-nums']
                }}
                >
                    <AnimateNumber initial={budget.total} value={budget.total} formatter={(val) => {
                        return '$' + parseFloat(val).toFixed(2)
                    }}/>
                </Animated.Text>
            </Animated.View>
        </View>
       
    </View>
    <View style={{
        backgroundColor: 'rgba(255,255,255,0.33)', 
        height: 12, 
        width: '100%', 
        borderRadius: 24, 
        overflow: 'hidden'
    }}>
    <Animated.View style={{
        backgroundColor: 'white', 
        height: '100%', 
        width: progressAnim.interpolate({
            inputRange : [0,1],
            outputRange: ['0%', '100%']
        })
    }}/>
    </View>
    </>
)
}

export default PanelInner;