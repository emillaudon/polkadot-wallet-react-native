import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const LoginBox = ({ navigation, login, register }) => {
  const [errorText, setErrorText] = useState('');

  const textInputRef = useRef(null);

  const toggleFocus = () => {
    if (textInputRef.current.isFocused()) {
      textInputRef.current.blur();
    } else {
      textInputRef.current.focus();
    }
  };

  let email = '';
  let password = '';

  useEffect(() => {
    toggleFocus();
  });

  return (
    <View>
      <TextInput
        ref={textInputRef}
        placeholder={'E-mail'}
        style={styles.inputText}
        onChangeText={(text) => (email = text)}
      />

      <TextInput
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.inputText}
        onChangeText={(text) => (password = text)}
      />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => login(email, password, setErrorText, navigation)}
          style={styles.loginButton}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => register(email, password, setErrorText, navigation)}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{ fontSize: 10, color: 'red', alignSelf: 'center', margin: 15 }}
      >
        {errorText}
      </Text>
    </View>
  );
};

export default LoginBox;

const styles = StyleSheet.create({});
