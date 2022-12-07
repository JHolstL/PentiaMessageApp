import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {addDoc, collection, serverTimestamp} from "@firebase/firestore";
import { Form, FormItem } from 'react-native-form-component';
import { FlatList } from 'react-native';

//async function to send data to firestore
async function sendMessage(roomId, user, text){
  try{
    // await addDoc(collection(firestore, 'chatRooms', roomId, 'messages'), text);
    //Get the collection
    const ref = firestore().collection('chatRooms').doc(roomId).collection('messages');

    //Create a timestamp from the current time
    const timestamp = Date.now();

    //Add the message to the collection
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
  const scrollviewRef = useRef();

  //UseEffect is called when component mounts, and fetches Chat room data from Firestore
  useEffect(() => {
    Fetchdata();
  }, [])

  //Function is called if onSnapshot receives a result
  function onResult(QuerySnapshot) {
    QuerySnapshot.docChanges().forEach(element => {
      var data = element.doc.data();
      setMessages(arr => [...arr, data]);
    });
    console.log('Got Mesages collection result.');
  }
  
  //Function is called if onSnapshot receives an error
  function onError(error) {
    console.error(error);
  }

  //Function to get all the messages in firestore for the current chatroom
  const Fetchdata = () => {
    const ref = firestore().collection('chatRooms').doc(room.id).collection('messages');
    
    //The query is ordered by timestamp in ascending order to display newest messages first
    ref.orderBy('timestamp', 'asc').onSnapshot(onResult, onError)    
  }

  //Function to convert a timestamp from firebase to a readable DateTime format
  const convertTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('da-DK', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(timestamp);
  }

  //Function is called when user sends a message
  const handleSubmit = () => {
    sendMessage(room.id, user.user, message)
    setMessage('')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to the {room.title} chat room!</Text>
      <ScrollView 
      contentContainerStyle={styles.textWindowScroll} 
      style={styles.textWindow} ref={scrollviewRef} 
      onContentSizeChange={() => scrollviewRef.current.scrollToEnd({ animated: true })}
      showsVerticalScrollIndicator={false}
      >
        {
          messages.map((data, index) => (
            <Message
            text={data.text}
            name={data.displayName}
            timestamp={convertTimestamp(data.timestamp)}
            key={index}
            />
          ))
        }
        

      </ScrollView>
        <View style={styles.inputContainer} nested>
          <TextInput style={styles.form} placeholder='Enter Message' value={message} onChangeText={(message) => setMessage(message)} ref={messageRef}/>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{fontWeight: 'bold',}}>Send</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

//Message component to construct how a message should be displayed in the UI
const Message = ({text, name, timestamp}) => {
  return(
    <View>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.textMessage}>
        <Text style={styles.messageText}>{text}</Text>
      </View>
      <Text style={styles.timestampText}>{timestamp}</Text>
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
  textWindowScroll : {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
  },
  textMessage: {
    alignItems: 'flex-start',
    backgroundColor: '#616161',
    marginLeft: 5,
    // height: 35,
    justifyContent: 'center',
    textAlign: 'left',
    borderRadius: 10,
    alignSelf: 'flex-start',

  },
  messageText: {
    color: '#FFFFFF',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 5,
  },
  nameText: {
    paddingLeft: 7,
    fontSize: 13,
  },
  timestampText : {
    paddingLeft: 7,
    fontSize: 13,
    paddingBottom: 10,
  },
});