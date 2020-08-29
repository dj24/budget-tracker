import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Animated, Easing, ScrollView } from 'react-native';
import { useAnimatedValue, useScreenDimensions } from '../hooks';
import Button from './Button';
import theme from '../theme';
import Transaction from './Transaction';

const Transactions = ({handlePrev, handleNext, show, transactions = [-10, 10, 20, -50, 30]}) => {
  const {screenWidth} = useScreenDimensions();
    const [active, setActive] = useState(false)
    const [filtered, setFiltered] = useState(transactions)
    const slideAnim = useAnimatedValue(0)

    const anims = transactions.map(() => useAnimatedValue(0));

    const handleEdit = () => {
      
    }

    const animateRows = (delay = 0) => Animated.stagger(50, anims.map(anim => 
      Animated.spring(anim, {
        toValue: 1,
        bounciness: 10,
        delay,
        useNativeDriver: true, 
      }),
    )).start();

    const buttonAnims = [
      useAnimatedValue(0),
      useAnimatedValue(0),
      useAnimatedValue(0)
    ];

    useEffect(() => {
      if(active === 1){
        setFiltered(transactions.filter(t => t > 0))
      }
      if(active === 2){
        setFiltered(transactions.filter(t => t < 0))
      }
      anims.forEach(anim => anim.setValue(0))
      animateRows(active === false ? 400 : 0);
    },[active])

    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: show ? 1 : 0,
        duration: 100,
        useNativeDriver: true, 
      }).start();
    },[show])

    useEffect(() => {
      const animateButtons = buttonAnims.map((anim,i) => 
        Animated.spring(anim, {
          toValue: 1,
          delay: 400,
          bounciness: 15,
          useNativeDriver: true, 
        }),
      );
      Animated.stagger(50, animateButtons).start();
    }, [])

    const {screenHeight}= useScreenDimensions();
    const buttons = [
      {
        name: 'All',
       },
       { 
         name: 'Income',
         icon: 'up',
         colour: theme.success,
      },
      {
        name: 'Expenses',
        icon: 'down',
        colour: theme.danger,
      }
    ];

    return (
      <Animated.View style={{
        zIndex: -1,
        height: screenHeight - theme.panelExpandedHeight, 
        width:show ? screenWidth : screenWidth - 40,
        opacity: slideAnim,
        transform: [
        //   {
        //   translateY: slideAnim.interpolate({
        //     inputRange: [0,1],
        //     outputRange: [theme.panelExpandedHeight - screenHeight,0]
        //   })
        // }
      ],
      backgroundColor: 'white',
      borderRadius: slideAnim.interpolate({
        inputRange: [0,1],
        outputRange: [theme.borderRadius, 0]
      })
      }}>
        <View style={{ 
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingHorizontal: 30,
          paddingVertical: 20
        }}>
        {buttons.map((item, i) => (
          <Animated.View key={i} style={{
            opacity: buttonAnims[i],
            transform: [
              {
                scale: buttonAnims[i].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.75, 1]
                }),
              }
            ]
          }}>
            <Button onPress={() => {
              handleNext(); 
              setActive(i)
            }} active={i == active} style={{marginRight: 15}}>
              {item.name}
            </Button>
          </Animated.View>
        ))}
        </View>
        <ScrollView style={{paddingTop: 10}}>
          {filtered.map((row,i) => (
            <Animated.View style={{
              opacity: anims[i],
              transform: [
                {
                  scale: anims[i].interpolate({
                    inputRange: [0,1],
                    outputRange: [0.95, 1]
                  })
                },
                {
                  translateY: anims[i].interpolate({
                    inputRange: [0,1],
                    outputRange: [-20, 0]
                  })
                }
              ]
            }}>
              <Transaction key={i} transaction={row}/>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>
    )
}

  export default Transactions;