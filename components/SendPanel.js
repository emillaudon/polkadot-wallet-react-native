import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NetworkHandler from '../NetworkHandler';
import { TextInput } from 'react-native-paper';

let networkHandler = new NetworkHandler();

const SendPanel = ({ wallets, selectedWallet }) => {
  let address = '';
  let amount = 0.0;

  return (
    <View style={styles.sendPanel}>
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', padding: 10, fontSize: 19 }}>
          Send{' '}
        </Text>
        <Text
          style={{ padding: 15, backgroundColor: '#eaeaeaea', color: 'black' }}
        >
          Receiving Address{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <TextInput
            onChangeText={(text) => (address = text)}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            autoCorrect={false}
            style={{
              borderColor: 'white',
              width: '80%',
              borderBottomWidth: 0,
              borderWidth: 0,
              underlineColorAndroid: 'white',
              borderBottomColor: 'white',
              backgroundColor: 'white',
            }}
          />
          <FontAwesome name={'qrcode'} size={40} color={'blue'} />
        </View>
        <Text
          style={{ padding: 15, backgroundColor: '#eaeaeaea', color: 'black' }}
        >
          Amount
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}
        >
          <TextInput
            onChangeText={(text) => {
              console.log(1);
              console.log(text);
              try {
                console.log(2);
                let val = parseFloat(text);
                if (!isNaN(val)) {
                  amount = val;
                  console.log(amount);
                }
                console.log(val);
                console.log(3);
              } catch (e) {
                console.log(e);
              }
            }}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            autoCorrect={false}
            style={{
              borderColor: 'white',
              width: '80%',
              borderBottomWidth: 0,
              borderWidth: 0,
              underlineColorAndroid: 'white',
              borderBottomColor: 'white',
              backgroundColor: 'white',
            }}
          />
        </View>

        <Text
          style={{ padding: 15, backgroundColor: '#eaeaeaea', color: 'black' }}
        >
          Fee:{' '}
        </Text>

        <TouchableOpacity
          onPress={() =>
            networkHandler.performTransaction(
              selectedWallet.address,
              address,
              amount
            )
          }
          style={{
            alignSelf: 'center',
            marginTop: 60,
            padding: 15,
            paddingHorizontal: 40,
            backgroundColor: 'pink',
          }}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendPanel;

const styles = StyleSheet.create({
  sendPanel: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});
