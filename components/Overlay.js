import React, { useState, useEffect, useContext } from 'react';
import { Animated, Easing, Text, View, ScrollView, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { useScreenDimensions, useAnimatedValue } from '../hooks';
import { LinearGradient } from 'expo-linear-gradient';
import Transactions from './Transactions';
import theme from '../theme';
import PanelInner from './PanelInner';
import styles from '../styles';
import AppContext from '../contexts/AppContext';
import OverlayHeader from './OverlayHeader';

const animate = onEnd => {
  LayoutAnimation.configureNext(
    { 
      update: { type: 'spring', springDamping: 0.9, duration: 700 },
    },
    onEnd
  );
}

const Overlay = () => {
    const [active, setActive] = useState(false)
    const transAnim = useAnimatedValue(0);
    const fadeAnim = useAnimatedValue(0);
    const backgroundAnimValue = useAnimatedValue(0);
    const [showTransactions, setShowTransactions] = useState(false);
    const {screenWidth} = useScreenDimensions();
    const {
      handleHide, 
      setShowBudgets, 
      budgets, 
      budgetIndex,
      setBudgetIndex, 
      scroll,
      setStatusBarColour
    } = useContext(AppContext)
    const [budgetScale, setBudgetScale] = useState([budgets[budgetIndex],budgets[budgetIndex]]);

    useEffect(() => {
      animate();
      setShowTransactions(true);
      setActive(true);
    }, [])


    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 200,
          useNativeDriver: false
        }
      ).start();
    }, [fadeAnim])

    useEffect(() => {
      Animated.timing(
        backgroundAnimValue,
        {
          toValue: 1,
          duration: 400,
          useNativeDriver: false
        }
      ).start();
    },[budgetIndex])

    useEffect(() => {
      Animated.timing(
        transAnim,
        {
          toValue: 1,
          duration: 400,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          useNativeDriver: false
        }
      ).start();
    }, [showTransactions])
  
  const margins = 20;
  // const headerOffset = 120;
  const headerOffset = 156;
  
  const handleNext = () => {
    backgroundAnimValue.setValue(0);
    const next = budgetIndex === budgets.length - 1 ? 0 : budgetIndex + 1;
    setBudgetScale([budgets[budgetIndex], budgets[next]]);
    setBudgetIndex(next)
  }

  const handlePrev = () => {
    const prev = budgetIndex === 0 ? budgets.length - 1 : budgetIndex - 1;
    setBudgetScale([budgets[budgetIndex], budgets[prev]]);
    setBudgetIndex(prev)
  }

  const handleBack = () => {
    setShowBudgets(true);
    setShowTransactions(false);
    setActive(false); 
    setStatusBarColour('dark');
    animate(handleHide);
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }
    ).start();
  }

  return( 
    <>
    {showTransactions && <OverlayHeader handleBack={handleBack}/>}
    <Animated.ScrollView 
      style={{
        borderRadius: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0]
        }),
        ...styles.overlay,
        marginLeft:active ? 0 : theme.spacing,
        marginTop: active ? 0 : headerOffset - scroll + (margins + theme.panelHeight) * budgetIndex,
      }}
    >
      <Animated.View style={{
        marginTop: -theme.spacing,
        marginRight: -theme.spacing,
        height:active ? theme.panelExpandedHeight : theme.panelHeight,   
        width:active ? screenWidth : screenWidth - 40,
        overflow:'hidden',
        backgroundColor: backgroundAnimValue.interpolate({
          inputRange: [0, 1],
          outputRange: [budgetScale[0].colour, budgetScale[1].colour]
        }),
        flexDirection:'column',
        borderRadius: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0]
        }),
      }}>
          <LinearGradient style={{flex: 1, padding: 30, height: '100%'}}
            colors={['rgba(255,255,255,0)','rgba(255,255,255,0)']}
          >
            <PanelInner 
            handleBack={handleBack}
            budget={budgets[budgetIndex]} 
            expanded={active}
        />
          </LinearGradient>
      </Animated.View>
      <Transactions show={showTransactions} handlePrev={handlePrev} handleNext={handleNext}/>
    </Animated.ScrollView>
    </>
  ) 
  }

  export default Overlay;