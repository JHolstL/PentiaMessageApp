import React from 'react'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import ChatRooms from './ChatRooms';
import TextRoom from './TextRoom';

const Stack = createNativeStackNavigator();

//Function which contains all Routes in the application using React Navigation
export default function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='ChatRooms' component={ChatRooms} options={{gestureEnabled: false}}/>
        <Stack.Screen name='TextRoom' component={TextRoom}/>
      </Stack.Navigator>
    </NavigationContainer> 
  )
}
