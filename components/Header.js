import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import styles from '../styles';
import theme from '../theme';
// import Icon from './Icon';
import Icon from "react-native-vector-icons/Ionicons";
// import Button from './Button';
import { useApp } from '../hooks';
import { BlurView } from 'expo-blur';
1
const Header = () => {
  const { scroll } = useApp();
  return(
    <>
      {scroll > 0 && <BlurView intensity={100} style={{
       position: 'absolute', 
       width: '100%', 
       height: 95,
       paddingTop: 58, 
       zIndex:1,
       alignItems: 'center',
       borderWidth: 1,
       borderColor: 'rgb(200,200,200)',
      }}>
      {scroll > 30 && <Text style={styles.subheading}>Budgets</Text>}
    </BlurView>}
    <Icon
      name="ios-add"
      color={theme.link}
      size={37}
      style={{
        position: 'absolute', 
        zIndex:2,
        left: theme.spacing,
        top: 50
      }}
    />
    <View style={{position: 'absolute', top: 50, right: theme.spacing, zIndex:2 }}>
      <Button title='Select'/>
    </View>
    
    </>
  )
}
  export default Header;