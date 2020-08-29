import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { View, Animated } from 'react-native';

import { Overlay, Budgets, Transactions } from './components';
import { AppContext } from './contexts';
import { useAnimatedValue } from './hooks';
import theme from './theme';

const AppProvider = ({children}) => {
  let scrollY = useAnimatedValue(0);
  const [scroll, setScroll] = useState(0);
  const [budgetIndex, setBudgetIndex] = useState(null);
  const [velocity, setVelocity] = useState(0);
  const [showBudgets, setShowBudgets] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [statusBarColour, setStatusBarColour] = useState('dark');

  const handleScroll = event => {
    Animated.event(
      scrollY =  event.nativeEvent.contentOffset.y,
      {
        useNativeDriver: true
      }
    )
    const currentScroll = event.nativeEvent.contentOffset.y;
    setScroll(currentScroll);
  }

  const handleShow = (i) => {
    setBudgetIndex(i);
    setShowBudgets(false);
    setOverlay(true);
    setStatusBarColour('light');
  }

  const handleHide = () => {
    setOverlay(false);
    setBudgetIndex(null);
  }

  const budgets = [
    {
      colour: 'rgb(29, 209, 161)',
      total: 450000.00,
      progress: 0.75,
      name: 'August 2020'
    },
    {
      colour: 'rgb(255, 159, 67)',
      total: 400.00,
      progress: 0.5,
      name: 'March 2020'
    }, 
    {
      colour: 'rgb(0, 210, 211)',
      total: 250.00,
      progress: 0.25,
      name: 'July 2020'
    }, 
    {
      colour: 'rgb(84, 160, 255)',
      total: 575.00,
      progress: 0.66,
      name: 'June 2020'
    }, 
    {
      colour: 'rgb(255, 159, 243)',
      total: 300.00,
      progress: 0.33,
      name: 'May 2020'
    }, 
    {
      colour: 'rgb(255, 107, 107)',
      total: 650.50,
      progress: 0.95,
      name: 'April 2020'
    },
    {
      colour: 'rgb(254, 202, 87)',
      total: 400.00,
      progress: 0.1,
      name: 'February 2020'
    },
  ];

  const context = {
    handleHide,
    handleShow,
    handleScroll,
    scroll,
    velocity,
    showBudgets,
    setShowBudgets,
    budgetIndex,
    setBudgetIndex,
    overlay,
    budgets,
    scrollY,
    statusBarColour,
    setStatusBarColour
  }

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  ) 
}

const Screen = () => {
  const { overlay, budgets } = useContext(AppContext);

  return (
    <>
      <Budgets budgets={budgets}/>
      {overlay && <Overlay/>}
    </>
  )
}

export default function App() {


  return (
    <View style={{flex:1, backgroundColor: theme.bg}}>
      <AppProvider>
        <Screen/>
      </AppProvider>
    </View>
  );
  }
