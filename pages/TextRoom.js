import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {addDoc, collection, serverTimestamp} from "@firebase/firestore";
import { Form, FormItem } from 'react-native-form-component';
import { FlatList } from 'react-native';

async function sendMessage(roomId, user, text){
  try{
    // await addDoc(collection(firestore, 'chatRooms', roomId, 'messages'), text);
    const ref = firestore().collection('chatRooms').doc(roomId).collection('messages');
    const timestamp = Date.now();
    await ref.add({
      uid: user.uid,
      displayName: user.displayName,
      text: text,
      timestamp: timestamp,
    });
  } catch (error) {
    console.log(error);
    console.log('Her')
  }
}

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

async function getMessages(roomId, callback){
  try{
    console.log('Here')
    const ref = firestore().collection('chatRooms').doc(roomId).collection('messages');
    const messages = ref.orderBy('timestamp', 'asc').get();
    callback(messages)
  } catch (error){
    console.log(error);
  }

}

export default function TextRoom({route, navigation}) {
  const {room} = route.params;
  const {user} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const messageRef = useRef();

  // window.addEventListener('load', () => {
  //   Fetchdata();
  // });

  useEffect(() => {
    Fetchdata();
  }, [room.id])

  function onResult(QuerySnapshot) {
    QuerySnapshot.docChanges().forEach(element => {
      var data = element.doc.data();
      setMessages(arr => [...arr, data]);
    });
    console.log('Got Mesages collection result.');
  }
  
  function onError(error) {
    console.error(error);
  }

  const Fetchdata = () => {
    const ref = firestore().collection('chatRooms').doc(room.id).collection('messages');
    ref.orderBy('timestamp', 'asc').onSnapshot(onResult, onError)    
  }

  // useEffect(() => {
  //   getMessages(room.id, setMessages);
  //   console.log(messages)
  // }, [room.id])

  const handleSubmit = () => {
    sendMessage(room.id, user.user, message)
    setMessage('')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to the {room.title} chat room!</Text>
      <ScrollView style={styles.textWindow}>
        {/* {messages.map((message) => (
          <View>
            <Text>{message.text}</Text>
          </View>
        ))} */}
        {
          messages.map((data) => (
            <Message
            text={data.text}
            name={data.displayName}
            />
          ))
        }
        


      </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput style={styles.form} placeholder='Enter Message' value={message} onChangeText={(message) => setMessage(message)} ref={messageRef}/>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{fontWeight: 'bold',}}>Send</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const Message = ({text, name, }) => {
  return(
    <View>
      <Text>{text} + {name}</Text>
    </View>
  );
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
    height: 540,
    borderColor: '#D0D0D0',
    borderStyle: 'solid',
    backgroundColor: '#C4C4C4',
    borderRadius: 10,

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    
    borderRadius: 5,
    width: 70,
    backgroundColor: '#318BFF'
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 270,
    height: 40,
    paddingRight: 10,

  },
  inputContainer: {
    paddingTop: 10,
    flexDirection: 'row',
  }
})