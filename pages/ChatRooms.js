import React, {useRef, useEffect, useState, useCallback} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, RefreshControl, ScrollView} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatRooms({route, navigation}) {
  
  const {user} = route.params;
  const [chatRooms, setChatRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  //UseEffect is called when component mounts, and fetches Chat room data from Firestore
  useEffect(() => {
    FetchChatRooms();
  }, []);

  //Function is run of onSnapshot receives a result and sets the data from
  //the query to the chatRooms array
  function onResult(QuerySnapshot) {
    QuerySnapshot.docChanges().forEach(element => {
      var data = element.doc.data();
      setChatRooms(arr => [...arr, data]);
    });
    console.log('Got Mesages collection result.');
  }
  
  //Function is run if onSnapshot receives an error.
  function onError(error) {
    console.error(error);
  }

  //Function to get Chat room data from firestore
  const FetchChatRooms = () => {
    //Find the collection
    const ref = firestore().collection('chatRooms');

    //onSnapshot creates a listener on this collection, and returns a snapshot
    //when new data is added to the collection
    ref.onSnapshot(onResult, onError)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // window.location.reload();
    // FetchChatRooms();
    navigation.push('ChatRooms', {user: user})
    setTimeout(function() {
      setRefreshing(false)
    }, 2000)
  }, []);

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
        onPress={()=>{navigation.navigate('TextRoom', {room: room, user: user})}}
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
