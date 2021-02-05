import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const WalletBox = (props) => {
  let item =
    props.item !== undefined
      ? props.item
      : {
          address: 'No data',
          balance: 'No data',
        };
  let setSelectedWallet = props.setSelectedWallet;

  return (
    <TouchableOpacity
      onPress={() => setSelectedWallet(item)}
      style={styles.walletBox}
    >
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={{ fontStyle: 'italic' }}>{item.address}</Text>
          <Text style={{ fontSize: 17 }}>
            {item.balance}{' '}
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>DOT</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WalletBox;

const styles = StyleSheet.create({
  walletBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginBottom: 0,
    marginLeft: 20,
    height: 70,
    width: 300,
  },
});
