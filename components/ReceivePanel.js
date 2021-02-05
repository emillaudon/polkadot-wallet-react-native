import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';

const ReceivePanel = ({ wallets }) => {
  return (
    <View style={styles.receivePanel}>
      <View>
        <Text style={{ fontWeight: 'bold', padding: 10 }}>
          Press Wallet To Copy Address
        </Text>
        <FlatList
          data={wallets}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => console.log()}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ width: '60%', padding: 10 }}>
                    {item.address}
                  </Text>
                  <Text style={{ fontWeight: 'bold', padding: 10 }}>
                    {item.balance}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ReceivePanel;

const styles = StyleSheet.create({
  receivePanel: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});
