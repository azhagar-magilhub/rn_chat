import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { notification } from '../utils/notification-utils';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      setLoading(false);
      notification('please add all the field', 'error')
    } else {
      try {
        const result = await auth().createUserWithEmailAndPassword(email, password,);
        await firestore().collection('users').doc(result.user.uid).set({
          name: name,
          email: result.user.email,
          uid: result.user.uid,
          status: 'online',
          pic: image ? image : 'https://w7.pngwing.com/pngs/600/114/png-transparent-dragon-kali-linux-android-linux-logo-silhouette-linux-thumbnail.png'
        });
        setLoading(false);
      } catch (err) {
        notification('something went wrong', 'error')
      }
    }
  };


  const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, fileobj => {
      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(fileobj.uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            notification('image uploaded Successfully', 'success')
          }
        },
        error => {
          console.log('error :: ', JSON.stringify(error));
          notification('error uploading image', 'error')
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setImage(downloadURL);
            console.log('downloadURL :: ', downloadURL);
          });
        },
      );
    });
  };


  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome </Text>
        <Image style={styles.img} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.box2}>

        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
        />
        <TextInput
          label="password"
          mode="outlined"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
        />


        <Button style={[styles.buttonStyle]} mode="contained" onPress={() => pickImageAndUpload()}>
          select profile pic
        </Button>

        <TouchableOpacity onPress={() => userSignup()}>
          <View style={styles.buttonStyle}>
            {loading ? (<ActivityIndicator size="small" color="#ffffff" />)
              : (<Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Signup</Text>)}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ textAlign: 'center' }}>Already have an account ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'black',
    margin: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
  box1: {
    alignItems: 'center',
  },
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',

  }, buttonStyle: { height: 50, width: 250, backgroundColor: 'black', margin: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }
});
