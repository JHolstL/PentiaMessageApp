import { View, Text, StyleSheet } from 'react-native';
import React, {useRef, useState} from 'react';
// import {firestore} from './firebase/firebase.js';
import firestore from '@react-native-firebase/firestore';
import {addDoc, collection, serverTimestamp} from "@firebase/firestore";
import { Form, FormItem } from 'react-native-form-component';

// async function sendMessage(roomId, user, text){
//   try{
//     await addDoc(collection(firestore, 'chatRooms', roomId, 'messages'),{
//       uid: user.uid,
//       displayName: user.displayName,
//       text: text,
//       timestamp: serverTimestamp(),
//     });
//   } catch (error) {
//     console.log(error);
//     console.log('Her')
//   }
// }

async function sendMessage(roomId, user, text){
  try{
    // await addDoc(collection(firestore, 'chatRooms', roomId, 'messages'), text);
    const ref = firestore().collection('chatRooms').doc(roomId).collection('messages');
    await ref.add({
      uid: user.uid,
      displayName: user.displayName,
      text: text,
      timestamp: 'firestore.Time'
    })
  } catch (error) {
    console.log(error);
    console.log('Her')
  }
}

export default function TextRoom({route, navigation}) {
  const {room} = route.params;
  const {user} = route.params;
  const [message, setMessage] = useState('');
  const messageRef = useRef();

  const handleSubmit = () => {
    sendMessage(room.id, user.user, message)
    setMessage('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the {room.title} chat room!</Text>
      <Text style={styles.header}>{message} chat room!</Text>
      <View style={styles.textWindow}>
        <Form onButtonPress={handleSubmit} buttonText='Send'>
          <FormItem
          value={message}
          onChangeText={(message) => setMessage(message)}
          ref={messageRef}
          />

        </Form>

        <Text>Welcome {user.user.displayName}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  textWindow: {
    width: 350,
    height: 600,
    borderColor: '#D0D0D0',
    borderStyle: 'solid',
    backgroundColor: '#C4C4C4',
    borderRadius: 10,

  }
})