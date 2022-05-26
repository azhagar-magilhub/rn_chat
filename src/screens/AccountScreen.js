import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function AccountScreen({ user }) {
  const [profile, setProfile] = useState('');

  console.log('user', user)

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(docSnap => {
        setProfile(docSnap.data());
      });
  }, []);

  const logout = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({ status: firestore.FieldValue.serverTimestamp(), })
      .then(() => {
        auth().signOut();
      });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: profile.pic }} />
      <View style={{ width: '70%', }}>
        <Text numberOfLines={2} style={styles.text}>Name - {profile.name}</Text>
        <Text numberOfLines={2} style={[styles.text]}>{profile.email}</Text>

        <TouchableOpacity onPress={() => logout()}>
          <View style={styles.buttonStyle}>
            {!profile ? (<ActivityIndicator size="small" color="#ffffff" />)
              : (<Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Logout</Text>)}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 8
  },
  img: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: 'black',
    margin: 10
  },
  text: {
    fontSize: 14,
    color: 'black',
    margin: 4
  },
  btn: {
    borderColor: 'black',
    borderWidth: 3,
  },
  buttonStyle: { height: 50, width: 250, backgroundColor: 'black', margin: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }
});
