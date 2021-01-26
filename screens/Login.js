
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../firebase';

const logo = require('../assets/logo.png')

import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";

const login = async (email, password, setErrorText, navigation) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        console.log(auth.currentUser);
        navigation.navigate('Home')
    } catch (error) {
        let e = error.toString();
        setErrorText(e)
    }
}

const register = async (email, password, setErrorText, navigation) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        navigation.navigate('Home');
    } catch (error) {
        let e = error.toString();
        setErrorText(e)
    }
}

const LoginBox = ({ navigation }) => {
    const [errorText, setErrorText] = useState('')

    let email = '';
    let password = '';

    return (
        <View style={styles.login}>
            <TextInput 
                placeholder={'E-mail'}
                style={ styles.inputText }
                onChangeText={(text) => email = text}
            />

            <TextInput 
                placeholder={'Password'}
                secureTextEntry={true}
                style={ styles.inputText }
                onChangeText={(text) => password = text}
            />

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity 
                    onPress={() => login(email, password, setErrorText, navigation)}
                    style={styles.loginButton}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={() => register(email, password, setErrorText, navigation)}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 10,color: 'red', alignSelf: 'center', margin: 15}}>
                {errorText}
            </Text>
        </View>
    );
}


export default function Login({ navigation }) {
    console.log(navigation)
  return (
    <View style={styles.loginScreen}>
        <Image style={{ height: 200, width: 300, marginBottom: 50 }}source={logo}/>
        <LoginBox navigation={ navigation } />

    </View>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#E50D7B',
      paddingTop: '30%'
  },
  inputText: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
  },
  loginButton: {
      alignSelf: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginHorizontal: 10,
      padding: 10,
      width: 100
  }

});
