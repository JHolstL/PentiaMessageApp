// import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from "react";
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useIsFocused } from "@react-navigation/native";

export default function Login({navigation}) {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState('');
    const isFocused = useIsFocused();

  //Configure web client id before signing in with Google
  GoogleSignin.configure({
    webClientId: '571922961897-55rqbgnffb8ij1qh455bch87ejibrdbs.apps.googleusercontent.com',
  });

  //Function to sign in with Google
  const signInWithGoogleAsync = async () => {
    // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google Firebase credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);

  //If signin is successfull, set the user info and set loggedIn to true
  if (user_sign_in != '') {
    user_sign_in.then((user)=>{
      setloggedIn(true);
      setuserInfo(user)
      console.log(userInfo);
      console.log(loggedIn);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  }

  //UseEffect is run when the setState for userinfo is done
  useEffect(() => {
    //Check if user is logged in, and redirect to next screen using React navigation
    if (isFocused) {
      console.log('called')
      if (loggedIn) {
        navigation.navigate('ChatRooms', {user: userInfo}) // This is to be executed when the state changes
      }
      
    }
  }, [userInfo, isFocused]);



  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false)
    } catch (error) {
      console.error(error);      }
  };

  //Function to sign in with Facebook
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

    //Set userinfo and login state
    setloggedIn(true);

    user_sign_in.then((user)=>{
      setuserInfo(user)
    })
    .catch((error)=>{
      console.log(error);
    })

    console.log(userInfo);

  }


  return (
    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', paddingBottom: 10}}>Welcome to my Message App!</Text>
        <Text style={{paddingBottom: 10, fontWeight: 'bold'}}>Choose how you want to login</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={signInWithGoogleAsync}
        >
          <Image source={require('../images/googleIcon.png')} resizeMode='contain'/>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fbButton}
          onPress={signInWithFacebook}
        >
          <Image source={require('../images/facebookIcon.png')} resizeMode='contain'/>
          <Text style={styles.fbText}>Sign in with Facebook</Text>
        </TouchableOpacity>

        {/* <Button 
        title='Sign out with Google'
        onPress={signOut}
        /> */}

        {!loggedIn && <Text>You are currently logged out</Text>}

    </View>
  )
}

const styles = StyleSheet.create({
  fbButton: {
    width: 200,
    height: 50,
    backgroundColor: '#4267B2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  googleButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderColor: '#D2D2D2',
    elevation: 20,
  },
  fbText: {
    color: Colors.white, 
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  googleText: {
    color: Colors.gray,
    fontWeight: 'bold',
    paddingLeft: 15,
  }

})
