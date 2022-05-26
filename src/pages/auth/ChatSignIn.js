import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '../../../Firebase/firebase';


const ChatSignIn = ({ navigation }) => {
    const [email, setEmail] = useState('azhagar.sparks@gmail.com');
    const [password, setPassword] = useState('password');

    const openRegisterScreen = () => {
        navigation.navigate('ChatSignUp');
    };

    const signin = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                console.log('userCredential', userCredential)
                navigation.navigate('Chat');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title='sign in' style={styles.button} onPress={signin} />
            <Button title="register" style={styles.button} onPress={openRegisterScreen} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 370,
        marginTop: 10
    }
});

export default ChatSignIn;