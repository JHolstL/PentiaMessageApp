// import React from 'react'
import { View, Text, Button } from 'react-native'
import {useEffect, useState} from "react";
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export default function login() {

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

  user_sign_in.then((user)=>{
    setuserInfo(user)
    console.log(userInfo);
  })
  .catch((error)=>{
    console.log(error);
  })
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
        <Text>Hello world</Text>
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
    </View>
  )
}
// function login() {
//   const [loggedIn, setloggedIn] = useState(false);
//   const [userInfo, setuserInfo] = useState([]);

//   const signIn = async () => {
//       try {
//           await GoogleSignin.hasPlayServices();
//           const {accessToken, idToken} = await GoogleSignin.signIn();
//           setloggedIn(true);
//       } catch (error) {
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//               // user cancelled the login flow
//               alert('Cancel');
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//               alert('Signin in progress');
//               // operation (f.e. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//               alert('PLAY_SERVICES_NOT_AVAILABLE');
//               // play services not available or outdated
//           } else {
//               // some other error happened
//           }
//       }
//   };

//   useEffect(() => {
//       GoogleSignin.configure({
//           scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
//           webClientId:
//               '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//           offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//       });
//   }, []);

//   const signOut = async () => {
//       try {
//           await GoogleSignin.revokeAccess();
//           await GoogleSignin.signOut();
//           setloggedIn(false);
//           setuserInfo([]);
//       } catch (error) {
//           console.error(error);
//       }
//   };


//   return (
//       <>
//           <StatusBar barStyle="dark-content" />
//           <SafeAreaView>
//               <ScrollView
//                   contentInsetAdjustmentBehavior="automatic"
//                   style={styles.scrollView}>
//                   <Header />

//                   <View style={styles.body}>
//                       <View style={styles.sectionContainer}>
//                           <GoogleSigninButton
//                               style={{width: 192, height: 48}}
//                               size={GoogleSigninButton.Size.Wide}
//                               color={GoogleSigninButton.Color.Dark}
//                               onPress={this._signIn}
//                           />
//                       </View>
//                       <View style={styles.buttonContainer}>
//                           {!loggedIn && <Text>You are currently logged out</Text>}
//                           {loggedIn && (
//                               <Button
//                                   onPress={this.signOut}
//                                   title="LogOut"
//                                   color="red"></Button>
//                           )}
//                       </View>
//                   </View>
//               </ScrollView>
//           </SafeAreaView>
//       </>
//   );
// }

// export default login;
