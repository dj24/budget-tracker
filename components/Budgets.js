import React, {useRef, useState, useEffect, useContext} from 'react';
import { Animated, Easing, ScrollView, View, Text, Button } from 'react-native';
import ContextMenu from "react-native-context-menu-view";
import { StatusBar } from 'expo-status-bar';
import { useAnimatedValue, useApp } from '../hooks';
import Header from './Header';
import Panel from './Panel';
import styles from '../styles';
import theme from '../theme';

const Budgets = ({budgets}) => {
  const anim =  useAnimatedValue(0);
  const [showPreview, setShowPreview] = useState(false);
  const {handleShow, handleScroll, showBudgets, budgetIndex, statusBarColour} = useApp();

    const handleAnimEnd = () => {
      setShowPreview(false);
    }
  
    useEffect(() => {
      setShowPreview(true);
        if(showBudgets){
          anim.setValue(0);
          Animated.timing(anim, {
            toValue: 1,
            delay: 200,
            duration: 800,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            useNativeDriver: true, 
          }).start(handleAnimEnd);
        }  
    }, [showBudgets])
  
    return (
      <Animated.View style={{
        flex: 1,
        flexDirection: 'column'
      }}>
        <StatusBar style={statusBarColour} animated/>
        <ScrollView style={{paddingHorizontal:theme.spacing, flex:1, paddingTop:95}} scrollEventThrottle={16} onScroll={handleScroll}>
          <Text style={[styles.heading, {marginBottom: 10}]}>Budgets</Text>
          {budgets.map((budget, i) => (
            <ContextMenu
              actions={[{ title: "Edit", systemIcon: 'pencil'}, { title: "Delete", systemIcon: 'trash', destructive: true }]}
              onPress={(e) => {
                console.warn(
                  `Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`
                );
              }}
            >
              <Animated.View style={{
                marginVertical: 10,
                borderRadius: 12,
                transform:[
                  { 
                    scale : anim.interpolate({
                      inputRange: [0,1],
                      outputRange: [0.8,1]
                    })
                  }
                ],
                opacity : anim
              }}>
                <Panel budget={budget} show={i !== budgetIndex} key={i} onPress={() => handleShow(i, budget.colour)}/>
              </Animated.View>
            </ContextMenu>
          ))}
        </ScrollView>
        <Header/>
      </Animated.View> 
    )
  }

  export default Budgets;