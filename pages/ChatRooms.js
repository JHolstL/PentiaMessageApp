import React, {useRef, useEffect, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';

export default function ChatRooms({route, navigation}) {
  
  const {user} = route.params;
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    FetchChatRooms();
  }, [])

  function onResult(QuerySnapshot) {
    QuerySnapshot.docChanges().forEach(element => {
      var data = element.doc.data();
      setChatRooms(arr => [...arr, data]);
    });
    console.log('Got Mesages collection result.');
  }
  
  function onError(error) {
    console.error(error);
  }

  const FetchChatRooms = () => {
    const ref = firestore().collection('chatRooms');
    ref.onSnapshot(onResult, onError)
  }

  return (
    <View>
      <View style={{justifyContent:'flex-start', alignItems:'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom: 10}}>Welcome {user.user.displayName}</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>Choose a Chat Room:</Text>
      </View>

      <View style={{alignItems: 'center'}}>
      {chatRooms.map((room, index) => (   
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{navigation.navigate('TextRoom', {room: room, user: user})}}
        >
          <Text style={styles.roomText} key={index}>{room.title}</Text>
          <View style={styles.chevron}>
            <Image source={require('../images/chevron_icon.png')} resizeMode='contain'/>
          </View>
        
        </TouchableOpacity>          
      ))}
      </View>      
      
    </View>
    
  )
}

const styles = StyleSheet.create({

  button: {
    backgroundColor: '#5d5959',
    // paddingBottom: 10,
    height: 50,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,  
    flexDirection: 'row',  

  },
  roomText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 30,
    flex: 7,
  },
});
