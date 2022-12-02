import React, {useRef, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { render } from "react-dom";




export default function ChatRooms({route, navigation}) {
  
  const {user} = route.params;
  console.log(user + 'hej');

  const RoomTitles = [
    {id: 'stocks', title: 'Stocks'},
    {id: 'friends', title: 'Friends'},
    {id: 'football', title: 'Football'},
    {id: 'news', title: 'News'}
  ]

  // const listItems = RoomTitles.map((room) => (
  //   <Text style={styles.chatRoom} onPress={navigation.navigate('TextRoom')}>{room.title}</Text>
  // ))

  return (
    <View>
      <View style={{justifyContent:'flex-start', alignItems:'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom: 10}}>Welcome </Text>
      </View>
      <Text style={{fontSize: 15, fontWeight: 'bold', paddingBottom: 10}}>Choose a Chat Room:</Text>

      <View style={{alignItems: 'center'}}>
      {RoomTitles.map((room, index) => (   
        <Text style={styles.chatRoom} key={index} onPress={()=>{navigation.navigate('TextRoom', {title: room.title})}}>{room.title}</Text>
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
  chatRoom: {
    backgroundColor: '#5d5959',
    // paddingTop: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
})
