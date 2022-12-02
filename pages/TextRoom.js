import { View, Text } from 'react-native'
import React, {useRef} from 'react';
import {firestore} from './firebase'
import {addDoc, collection} from "@firebase/firestore"

async function sendMessage(roomId, user, text){
  try{
    await addDoc(collection(firestore, 'chatRooms', roomId, 'messages'))
  } catch {
    
  }
}

export default function TextRoom({route, navigation}) {
  const {title} = route.params;
  return (
    <View>
      <Text>Welcome to the {title} chat room!</Text>
    </View>
  )
}
