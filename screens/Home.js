
import { StatusBar } from "expo-status-bar";
//import './shim';
import React, { useState } from "react";
import { auth } from '../firebase';

//import Identicon from '@polkadot/reactnative-identicon';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

let wallet = {
  address: "0xdfaffafe33jxijd",
  balance: 20.1,
  transactions: [
    {
      amount: 1,
      received: true,
      to: "0xdfaffafe33jxijd",
      from: "zzxxsxjfjejfefkef",
      year: '2021',
      date: '21/2',
      time: "15:54",
    },
    {
      amount: 2,
      received: false,
      to: "0xdfaffafe33jxijd",
      from: "zzxxsxjfjejfefkef",
      year: '2021',
      date: '21/2',
      time: "15:54",
    },
    {
      amount: 3,
      received: true,
      to: "0xdfaffafe33jxijd",
      from: "zzxxsxjfjejfefkef",
      year: '2021',
      date: '21/2',
      time: "15:54",
    },
    {
      amount: 4,
      received: false,
      to: "0xdfaffafe33jxijd",
      from: "zzxxsxjfjejfefkef",
      year: '2021',
      date: '21/2',
      time: "15:54",
    },
  ],
};

const CreateWalletBox = ({ wallets, setWallets }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        setWallets([
          ...wallets,
          {
            amount: 1,
            to: "0xdfaffafe33jxijd",
            from: "zzxxsxjfjejfefkef",
            time: "15:54",
          },
        ])
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
        <Text>ffffff</Text>
        
        <View>
          <Text>{item.address}</Text>
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
  const [wallets, setWallets] = useState([wallet]);
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);

  return (
    <View style={styles.WalletScreen}>
      <Header wallets={wallets} setWallets={setWallets} setSelectedWallet={setSelectedWallet}/>
      <TransactionList wallet={selectedWallet} />
    </View>
  );
};

export default function Home() {
  console.log(auth.currentUser)
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
    backgroundColor: "pink",
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
