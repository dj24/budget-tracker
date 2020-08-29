import React, { useEffect } from 'react';
import { View, Text, ActionSheetIOS, TouchableOpacity, Animated } from 'react-native';
import theme from '../theme';
import Icon from "react-native-vector-icons/Ionicons";
import {  useAnimatedValue } from '../hooks';

const handleOptions = () =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Add Transaction", "Edit Budget", "Delete Budget"],
      destructiveButtonIndex: 3,
      cancelButtonIndex: 0
    },
    buttonIndex => {
      switch(buttonIndex){
        case 1:
          break;
        case 2:
          break;
        case 3:
          alert('Are you sure?')
          break;
      }
    }
  );

const OverlayHeader = ({handleBack}) => {
  const fadeIn = useAnimatedValue(0);

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      useNativeDriver: true, 
    }).start();
  },[])

  return(
    <Animated.View style={{ 
      position: 'absolute', 
      top: 50, 
      zIndex: 2, 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      width: '100%', 
      paddingHorizontal: 25,
      opacity: fadeIn
    }}>
      <TouchableOpacity onPress={handleBack} style={{}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="ios-arrow-back"
            color={'white'}
            size={30}
          />
          <Text style={{color: 'white', fontSize: 18, marginLeft: 8 }}>
            Budgets
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{}} 
          onPress={handleOptions}>
        <Icon
          name="ios-more"
          color={'white'}
          size={37}
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
  export default OverlayHeader;