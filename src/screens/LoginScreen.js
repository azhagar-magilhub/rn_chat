import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import { notification } from '../utils/notification-utils'


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      notification('please add all the field', 'error')
    } else {

      try {
        const result = await auth().signInWithEmailAndPassword(email, password);
        console.log('result', result)
        setLoading(false);
      } catch (err) {
        notification('something went wrong', 'error')
      }

    }

  };
  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.box1}>
        <Text style={styles.text}>Welcome</Text>
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

        <TouchableOpacity onPress={() => userLogin()}>
          <View style={styles.buttonStyle}>
            {loading ? (<ActivityIndicator size="small" color="#ffffff" />)
              : (<Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Login</Text>)}
          </View>
        </TouchableOpacity>
        {/* <Button color='black' style={styles.buttonStyle} mode="contained" onPress={() => userLogin()}>
          Login
        </Button> */}
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={{ textAlign: 'center' }}>Dont have an account ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen

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
    height: '50%',
  }, buttonStyle: { height: 50, width: 120, borderRadius: 10, alignItems: 'center', backgroundColor: 'black', justifyContent: 'center', alignSelf: 'center' }
});
