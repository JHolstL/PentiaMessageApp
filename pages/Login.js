// import React from 'react'
import { View, Text, Button } from 'react-native'
import {useEffect, useState} from "react";
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default function Login({navigation}) {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState('');

  GoogleSignin.configure({
    webClientId: '571922961897-55rqbgnffb8ij1qh455bch87ejibrdbs.apps.googleusercontent.com',
  });

  const signInWithGoogleAsync = async () => {
    // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);

  setloggedIn(true);

  await user_sign_in.then((user)=>{
    setuserInfo(user)
    console.log(userInfo);
  })
  .catch((error)=>{
    console.log(error);
  })

  navigation.navigate('ChatRooms', {user: userInfo})

  }

    const signOut = async () => {
      try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setloggedIn(false)
      } catch (error) {
          console.error(error);
      }
  };

  const signInWithFacebook = async () => {
    // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(facebookCredential)
  
  setloggedIn(true);

  user_sign_in.then((user)=>{
    setuserInfo(user)
    console.log(userInfo);
  })
  .catch((error)=>{
    console.log(error);
  })
  }

  return (
    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom: 10}}>Welcome to my Message App!</Text>
        <Text style={{paddingBottom: 10}}>Choose how you want to login</Text>
        <Button 
        title='Sign in with Google'
        onPress={signInWithGoogleAsync}
        />

        <Button 
        title='Sign out with Google'
        onPress={signOut}
        />
        {!loggedIn && <Text>You are currently logged out</Text>}

        <Button
        title='Sign in with Facebook'
        onPress={signInWithFacebook}
        />

        {/* {loggedIn && navigation.navigate('ChatRooms', {user: userInfo})} */}
    </View>
  )
}