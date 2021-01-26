
import { StatusBar } from "expo-status-bar";
//import './shim';
import React, { useState, useEffect } from "react";
import { auth, firestore } from '../firebase';
import NetworkHandler from '../NetworkHandler';

//import Identicon from '@polkadot/reactnative-identicon';

import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

let networkHandler = new NetworkHandler();

const CreateWalletBox = ({ wallets, setWallets }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        networkHandler.generateNewWallet()
      }
      style={styles.createWalletBox}
    >
      <View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const WalletBox = ({ item, setSelectedWallet }) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedWallet(item)}
      style={styles.walletBox}
    >
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={{ fontStyle: 'italic' }}>{item.address}</Text>
          <Text style={{ fontSize: 17 }}>
            {item.balance}{" "}
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>DOT</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Header = ({ wallets, setWallets, setSelectedWallet }) => {
  return (
    <View style={styles.header}>
      <FlatList
        horizontal={true}
        data={wallets}
        renderItem={({ item, index }) => <WalletBox item={item} setSelectedWallet={setSelectedWallet} />}
        ListHeaderComponent={ wallets.length > 0 ? null : <ActivityIndicator size={50} style={{ paddingTop:70 }}/> }
        ListFooterComponent={
          <CreateWalletBox wallets={wallets} setWallets={setWallets} />
        }
      />
    </View>
  );
};

const TransactionBox = ({ transaction }) => {
  
  return (
    <View
      style={styles.transactionBox}
    >
      <View>
        <Text>{transaction.received ? 'Received' : 'Sent'}</Text>
        <Text style={{ fontSize: 22 }}>{transaction.amount} DOT</Text>
      </View>
      <View>
        <Text>{transaction.received ? 'From' : 'To'}</Text>
        <Text>{transaction.received ? transaction.from : transaction.to}</Text>
      </View>
      <View>
        <Text>{transaction.time}</Text>
        <Text>{transaction.date}</Text>
        <Text>{transaction.year}</Text>
      </View>
    </View>
  );
};

const TransactionList = ({ wallet }) => {
  return (
    <View style={styles.transactionList}>
      <FlatList
        data={wallet.transactions}
        renderItem={({ item, index }) => <TransactionBox transaction={item} />}
      />
    </View>
  );
};

const WalletScreen = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState();

  useEffect(() => {
    async function loadData() {
      networkHandler.getUserData(setWallets, setSelectedWallet)
    }
    loadData();
  }, [])

  return (
    <View style={styles.WalletScreen}>
    
    <Header wallets={wallets} setWallets={setWallets} setSelectedWallet={setSelectedWallet}/>
      <Button 
        title={'Force load'}
        onPress={async () => {
          let networkHandler = new NetworkHandler();
          networkHandler.getUserData(setWallets, setSelectedWallet)
        
          
        }}
      />
      {selectedWallet ? <TransactionList wallet={selectedWallet} /> : <ActivityIndicator size={50}/>}
      
    </View>
  );
};

export default function Home() {
  return <WalletScreen />;
}

const styles = StyleSheet.create({
  walletScreen: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "#E50D7B",
  },
  transactionList: { height: "100%", width: "100%" },
  transactionBox: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 70,
    width: "100%",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderColor: "black",
    borderWidth: 1,
    flexDirection:'row'
  },
  walletBox: {
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginBottom: 20,
    marginLeft: 20,
    height: 70,
    width: 300,
  },
  createWalletBox: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    alignSelf: "auto",
    marginTop: 58,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    height: 70,
    width: 50,
  },

});
