import React from 'react'
import { View, Text } from 'react-native'

export default function TextRoom({route, navigation}) {
  const {title} = route.params;
  return (
    <View>
      <Text>Welcome to the {title} chat room!</Text>
    </View>
  )
}
