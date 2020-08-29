import { StyleSheet, PlatformColor } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
    panel: {
      padding: theme.spacing * 1.5,
      backgroundColor: theme.bg,
      borderRadius:  theme.spacing
    },
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      padding: theme.spacing
    },
    heading: {
      fontSize: 34,
      fontFamily: 'System',
      fontWeight: '700'
    },
    subheading: {
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: '600'
    },
    shadow: {
      shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    overlay: {
      paddingTop: theme.spacing,
      position: 'absolute',
      left: 0,
      right: 0
    },
  });