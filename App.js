import React from "react";
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from "./src/components/TabNavigation";

const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/> 
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/> 
        <Stack.Screen name='HomeMenu' component={TabNavigation} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
