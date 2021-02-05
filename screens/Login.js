import React from 'react';
import { auth } from '../firebase';
import LoginBox from '../components/LoginBox';

const logo = require('../assets/logo.png');

import { StyleSheet, Image, View } from 'react-native';

const login = async (email, password, setErrorText, navigation) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    navigation.navigate('Home');
  } catch (error) {
    let e = error.toString();
    console.log(e);
    setErrorText(e);
  }
};

const register = async (email, password, setErrorText, navigation) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    navigation.navigate('Home');
  } catch (error) {
    let e = error.toString();
    setErrorText(e);
  }
};

export default function Login({ navigation }) {
  console.log(navigation);
  return (
    <View style={styles.loginScreen}>
      <Image
        style={{ height: 200, width: 300, marginBottom: 30 }}
        source={logo}
      />
      <LoginBox navigation={navigation} login={login} register={register} />
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
    paddingTop: '30%',
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
    width: 100,
  },
});
