import React from 'react'
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, StackActionHelpers } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import ChatRooms from './ChatRooms';

const Stack = createNativeStackNavigator();

export default function Navigation({navigation}) {
  return (
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='ChatRooms' component={ChatRooms}/>
      </Stack.Navigator>    
  )
}

function HomeScreen({Navigation}){
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    {/* <TouchableOpacity
    
      onPress={() => Navigation.navigate('Login')}
    >
      <Text> Press me </Text>
    </TouchableOpacity> */}
    <Text>Hello</Text>
    <Button title='Press me'/>
  </View>


}
