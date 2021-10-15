import React from 'react';
import HomeScreen from './app/screens/HomeScreen';
import MovieDetailsScreen from './app/screens/MovieDetailsScreen';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Movies"
            component={HomeScreen}
          />
        <Stack.Screen
            name="Movie Details"
            component={MovieDetailsScreen}
            options={{ headerStyleInterpolator: forFade }}
          />
      </Stack.Navigator>
  </NavigationContainer>
  );
}
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
