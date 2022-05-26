import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {auth1} from '../../../firebase';
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const firebaseConfig = {
    apiKey: 'AIzaSyDTQZK6b6j079BfkNYavdL4u_BMT_xINA8',
    authDomain: 'chatapp-53b62.firebaseapp.com',
    projectId: 'chatapp-53b62',
    storageBucket: 'chatapp-53b62.appspot.com',
    messagingSenderId: '962908484120',
    appId: '1:962908484120:web:00ee5e9b271d9a6248096d',
    measurementId: 'G-VM9SKX5MB9',
  };

  const register = async () => {
    let response = await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('userCredential : ', JSON.stringify(userCredential));
        // Registered
        const user = userCredential.user;
        auth()
          .updateProfile(user, {
            displayName: name,
            photoURL: avatar
              ? avatar
              : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
          })
          .then(() => {
            alert('Registered, please login.');
          })
          .catch(error => {
            alert(error.message);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder="Enter your image url"
        label="Profile Picture"
        value={avatar}
        onChangeText={text => setAvatar(text)}
      />
      <Button title="register" onPress={register} style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default Register;
