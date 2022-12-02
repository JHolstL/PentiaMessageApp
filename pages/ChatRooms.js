import React, {useRef, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { render } from "react-dom";
import { Colors } from 'react-native/Libraries/NewAppScreen';




export default function ChatRooms({route, navigation}) {
  
  const {user} = route.params;
  console.log(user.user.displayName + 'hej');

  const RoomTitles = [
    {id: 'stocks', title: 'Stocks'},
    {id: 'friends', title: 'Friends'},
    {id: 'football', title: 'Football'},
    {id: 'news', title: 'News'}
  ]

  return (
    <View>
      <View style={{justifyContent:'flex-start', alignItems:'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom: 10}}>Welcome {user.user.displayName}</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>Choose a Chat Room:</Text>
      </View>

      <View style={{alignItems: 'center'}}>
      {RoomTitles.map((room, index) => (   
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{navigation.navigate('TextRoom', {title: room.title})}}
          >
            <Text style={styles.roomText} key={index}>{room.title}</Text>
          </TouchableOpacity>
          
      ))}
      </View>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity> */}

      
      
    </View>
    
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5d5959',
    // paddingBottom: 10,
    height: 50,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,    
  },
  roomText: {
    color: Colors.white
  },
})
