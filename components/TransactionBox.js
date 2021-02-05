import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TransactionBox = ({ transactionData }) => {
  let transaction = transactionData.data();
  //let transaction = transactionData;
  let color = transaction.receiving ? 'green' : 'red';

  return (
    <View style={styles.transactionBox}>
      <View style={{ width: 220 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
          {transaction.receiving ? 'From' : 'To'}
        </Text>
        <Text style={{ fontStyle: 'italic' }}>
          {transaction.receiving ? transaction.from : transaction.to}
        </Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 16, color: color }}>
          {transaction.receiving ? '+ ' : '- '}
        </Text>
        <Text style={{ fontSize: 18, color: color }}>
          {transaction.amount} DOT
        </Text>
      </View>
    </View>
  );
};

export default TransactionBox;

const styles = StyleSheet.create({
  transactionBox: {
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 70,
    width: '100%',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    flexDirection: 'row',
  },
});
