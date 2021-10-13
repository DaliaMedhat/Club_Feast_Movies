import React from 'react';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const Stack = createNativeStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator 
    // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
          name="Movies"
          options={{header: () => null}}
          component={HomeScreen}
        />
      <Stack.Screen
          name="Movie Details"
          options={{header: () => null}}
          component={MovieDetailsScreen}
        />
       
      </Stack.Navigator>
  </NavigationContainer>
  );
}


// export default function App() {
//   return(
//     <SafeAreaView style={{flex:1}}>

//         <HomeScreen/>
//     </SafeAreaView>
//   );
// }




