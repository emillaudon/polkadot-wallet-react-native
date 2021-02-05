import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CreateWalletBox = ({ wallets, setWallets, setModalIsVisible }) => {
  return (
    <TouchableOpacity
      onPress={() => setModalIsVisible(true)}
      style={styles.createWalletBox}
    >
      <View>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CreateWalletBox;

const styles = StyleSheet.create({
  createWalletBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'auto',
    marginTop: 58,
    marginRight: 20,
    marginBottom: 0,
    marginLeft: 20,
    height: 70,
    width: 50,
  },
});
