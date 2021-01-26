
import { StatusBar } from "expo-status-bar";
//import './shim';
import React, { useState, useEffect } from "react";
import { auth, firestore } from '../firebase';
import NetworkHandler from '../NetworkHandler';

//import Identicon from '@polkadot/reactnative-identicon';
import { FloatingAction } from "react-native-floating-action";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import { set } from "react-native-reanimated";

let networkHandler = new NetworkHandler();

const CreateWalletBox = ({ wallets, setWallets, setModalIsVisible }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        setModalIsVisible(true)
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

const Header = ({ wallets, setWallets, setSelectedWallet, setModalIsVisible }) => {
  return (
    <View style={styles.header}>
      <FlatList
        horizontal={true}
        data={wallets}
        renderItem={({ item, index }) => <WalletBox item={item} setSelectedWallet={setSelectedWallet} />}
        ListHeaderComponent={ wallets.length > 0 ? null : <ActivityIndicator size={50} style={{ paddingTop:70 }}/> }
        ListFooterComponent={
          <CreateWalletBox wallets={wallets} setWallets={setWallets} setModalIsVisible={setModalIsVisible} />
        }
      />
    </View>
  );
};

const TransactionBox = ({ transactionData }) => {
  let transaction = transactionData.data
  
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
        renderItem={({ item, index }) => <TransactionBox transactionData={item} />}
      />
    </View>
  );
};

const CreateWalletModal = ({ isModalVisible, setModalIsVisible }) => {
  const [loading, setLoading] = useState();
  return(
    <Modal visible={isModalVisible} transparent={true} >
          <View
            style={{ height: '100%', width: '100%', backgroundColor: 'rgba(1, 1, 1, 0.2)', justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={styles.createWalletModal}
            >
              <TouchableOpacity
                onPress={() => { 
                  setModalIsVisible(false)
                   }}
                style={{}}>
                <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold', }}>x</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Generate new wallet?</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="Cancel" onPress={() => {
                setModalIsVisible(false)
              }} />
              <Button title="Yes" onPress={ () => {
                networkHandler.generateNewWallet()
                  .then(setModalIsVisible(false))
              }} />
              </View>
            </View>
          </View>
        </Modal>
  );

}

const WalletScreen = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState();

  const [isModalVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      networkHandler.getUserData(setWallets, setSelectedWallet)
    }
    loadData();
  }, [])

  return (
    <View style={styles.walletScreen}>
    
    <Header wallets={wallets} setWallets={setWallets} setSelectedWallet={setSelectedWallet} setModalIsVisible={setModalIsVisible}
        title={'Force load'}
        onPress={async () => {
          let networkHandler = new NetworkHandler();
          networkHandler.getUserData(setWallets, setSelectedWallet)
        }}
      />
      
      {wallets.length > 0 ? <TransactionList wallet={selectedWallet} /> : <ActivityIndicator size={50}/>}
      <CreateWalletModal isModalVisible={isModalVisible} setModalIsVisible={setModalIsVisible} />
      <FloatingAction
        color={'#E50D7B'}
        onPressItem={name => {
      console.log(`selected button: ${name}`);
    }}
  />
    </View>
  );
};

/*
<TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {}}
          style={styles.fab}>
          <Image
            // FAB using TouchableOpacity with an image
            // For online image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            // For local image
            //source={require('./images/float-add-icon.png')}
            style={styles.fab}
          />
        </TouchableOpacity>

*/

export default function Home() {
  return <WalletScreen />;
}

const styles = StyleSheet.create({
  walletScreen: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
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
  createWalletModal: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '60%',
    height: '15%'
  },
  fab: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

});
