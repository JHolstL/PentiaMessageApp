import React, {useRef, useEffect, useState, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, RefreshControl, ScrollView} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from "@react-navigation/native";

export default function ChatRooms({route, navigation}) {
  
  const {user} = route.params;
  const [chatRooms, setChatRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const unsubscribe = useRef(null)
  const isFocused = useIsFocused();  

  //UseEffect is called when component mounts, and fetches Chat room data from Firestore
  useEffect(() => {
    if (isFocused) {
      FetchChatRooms();
    }
  }, [isFocused]);
  
  //Function to get Chat room data from firestore
  const FetchChatRooms = () => {
    setChatRooms([])
    //Find the collection
    const ref = firestore().collection('chatRooms');

    //onSnapshot creates a listener on this collection, and returns a snapshot
    //when new data is added to the collection
    unsubscribe.value = ref.orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((element) => {
        var data = element.doc.data();

        //New data is added to array
        setChatRooms(arr => [...arr, data]);
      });
      console.log('Got Chatrooms collection result.');
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // navigation.push('ChatRooms', {user: user})
    FetchChatRooms();
    setTimeout(function() {
      setRefreshing(false)
    }, 1000)
  }, []);

  function Navigate(room) {
    unsubscribe.value();
    navigation.navigate('TextRoom', {room: room, user: user});
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      
      <View style={{justifyContent:'flex-start', alignItems:'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom: 10}}>Welcome {user.user.displayName}</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>Choose a Chat Room:</Text>
      </View>

      <View style={{alignItems: 'center'}}>
      {chatRooms.map((room, index) => (   
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{Navigate(room);}}
        >
          <Text style={styles.roomText} key={index}>{room.title}</Text>
          <Image source={require('../images/chevron_icon.png')} resizeMode='contain'/>
        
        </TouchableOpacity>          
      ))}
      </View>

    </ScrollView>
    
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
