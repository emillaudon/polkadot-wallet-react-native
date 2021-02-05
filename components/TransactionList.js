import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TransactionBox from './TransactionBox';

const TransactionList = ({ wallet }) => {
  return (
    <View style={styles.transactionList}>
      <FlatList
        data={wallet.transactions}
        renderItem={({ item, index }) => (
          <TransactionBox transactionData={item} />
        )}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  transactionList: { height: '100%', width: '100%' },
});
