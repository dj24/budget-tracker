
import {useRef} from 'react';
import { Animated } from 'react-native';

const useAnimatedValue = value => useRef(new Animated.Value(value)).current

export default useAnimatedValue;