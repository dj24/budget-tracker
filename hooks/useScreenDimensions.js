import { Dimensions } from 'react-native';

const useScreenDimensions = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
  
    return {screenWidth, screenHeight};
  };

  export default useScreenDimensions;