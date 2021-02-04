import { StatusBar } from "expo-status-bar";
//import './shim';
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import NetworkHandler from "../NetworkHandler";
import SlidingUpPanel from "rn-sliding-up-panel";
//import Clipboard from '@react-native-community/clipboard';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
  ImageBackground,
  Animated,
} from "react-native";
import { set, add } from "react-native-reanimated";
import { TextInput } from "react-native-paper";

let networkHandler = new NetworkHandler();

const CreateWalletBox = ({ wallets, setWallets, setModalIsVisible }) => {
  return (
    <TouchableOpacity
      onPress={() => setModalIsVisible(true)}
      style={styles.createWalletBox}
    >
      <View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const WalletBox = (props) => {
  let item = 
        props.item !== undefined
          ? props.item
          : {
            address: 'No data',
            balance: 'No data',
          }
  let setSelectedWallet = props.setSelectedWallet;


  return (
    <TouchableOpacity
      onPress={() => setSelectedWallet(item)}
      style={styles.walletBox}
    >
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={{ fontStyle: "italic" }}>{item.address}</Text>
          <Text style={{ fontSize: 17 }}>
            {item.balance}{" "}
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>DOT</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Header = ({
  wallets,
  setWallets,
  setSelectedWallet,
  setModalIsVisible,
}) => {
  const logo = require("../assets/logo.png");

  return (
    <View style={styles.header}>
      <ImageBackground
        source={logo}
        style={{
          resizeMode: "cover",
          resizeMethod: "resize",
          height: "100%",
          width: "100%",
        }}
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={wallets}
          renderItem={({ item, index }) => (
            <WalletBox item={item} setSelectedWallet={setSelectedWallet} />
          )}
          keyExtractor={(item, index) => item.key = 'key' + index}
          ListHeaderComponent={
            wallets.length > 0 ? null : (
              <ActivityIndicator size={50} style={{ paddingTop: 70 }} />
            )
          }
          ListFooterComponent={
            <CreateWalletBox
              wallets={wallets}
              setWallets={setWallets}
              setModalIsVisible={setModalIsVisible}
            />
          }
        />
      </ImageBackground>
    </View>
  );
};

const TransactionBox = ({ transactionData }) => {
  let transaction = transactionData.data();
  //let transaction = transactionData;
  let color = transaction.receiving ? "green" : "red";

  return (
    <View style={styles.transactionBox}>
      <View style={{ width: 220 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {transaction.receiving ? "From" : "To"}
        </Text>
        <Text style={{ fontStyle: "italic" }}>
          {transaction.receiving ? transaction.from : transaction.to}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, color: color }}>
          {transaction.receiving ? "+ " : "- "}
        </Text>
        <Text style={{ fontSize: 18, color: color }}>
          {transaction.amount} DOT
        </Text>
      </View>
    </View>
  );
};

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

const CreateWalletModal = ({ isModalVisible, setModalIsVisible }) => {
  const [loading, setLoading] = useState();
  return (
    <Modal visible={isModalVisible} transparent={true}>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(1, 1, 1, 0.2)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.createWalletModal}>
          <TouchableOpacity
            onPress={() => {
              setModalIsVisible(false);
            }}
            style={{}}
          >
            <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: "bold" }}>
              x
            </Text>
          </TouchableOpacity>

          <Text
            style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}
          >
            Generate new wallet?
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Cancel"
              onPress={() => {
                setModalIsVisible(false);
              }}
            />
            <Button
              title="Yes"
              onPress={() => {
                networkHandler
                  .generateNewWallet()
                  .then(setModalIsVisible(false));
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const BottomTab = ({ showPanel, setSendPressed }) => {
  return (
    <View
      style={{
        height: "9%",
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderTopColor: "black",
        borderWidth: 0.2,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setSendPressed(true);
          showPanel(500);
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"arrow-up-bold-hexagon-outline"}
            brand
            size={40}
            color={"black"}
          />
          <Text> Send </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSendPressed(false);
          showPanel();
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <MaterialCommunityIcons
            name={"archive-arrow-down-outline"}
            brand
            size={40}
            color={"black"}
          />
          <Text> Receive </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ReceivePanel = ({ wallets }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        alignSelf: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", padding: 10 }}>
          Press Wallet To Copy Address
        </Text>
        <FlatList
          data={wallets}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => console.log()}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ width: "60%", padding: 10 }}>
                    {item.address}
                  </Text>
                  <Text style={{ fontWeight: "bold", padding: 10 }}>
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

const SendPanel = ({ wallets, selectedWallet }) => {
  let [fee, setFee] = useState(0);
  let [loadingFee, setLodingFee] = useState(false);
  let address = '';
  let amount = 0.0;

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        alignSelf: "center",
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", padding: 10, fontSize: 19 }}>
          Send{" "}
        </Text>
        <Text
          style={{ padding: 15, backgroundColor: "#eaeaeaea", color: "black" }}
        >
          Receiving Address{" "}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TextInput
          onChangeText={(text) => address = text}
          underlineColorAndroid={'rgba(0,0,0,0)' }
          autoCorrect={false}
            style={{
              borderColor: 'white',
              width: "80%",
              borderBottomWidth:0,
              borderWidth: 0,
              underlineColorAndroid: 'white',
              borderBottomColor: "white",
              backgroundColor: "white",
            }}
          />
          <FontAwesome name={"qrcode"} size={40} color={"blue"} />
        </View>
        <Text
          style={{ padding: 15, backgroundColor: "#eaeaeaea", color: "black" }}
        >
          Amount
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15
          }}
        >
          <TextInput
          onChangeText={(text) => {
            console.log(1)
            console.log(text)
            try {
              console.log(2)
              let val = parseFloat(text);
              if (!isNaN(val)) {
                amount = val;
              console.log(amount)
              }
              console.log(val)
              console.log(3)

            } catch (e) {
              console.log(e);
            }
          }}
          underlineColorAndroid={'rgba(0,0,0,0)' }
          autoCorrect={false}
            style={{
              borderColor: 'white',
              width: "80%",
              borderBottomWidth:0,
              borderWidth: 0,
              underlineColorAndroid: 'white',
              borderBottomColor: "white",
              backgroundColor: "white",
            }}
          />
        </View>

        <Text
          style={{ padding: 15, backgroundColor: "#eaeaeaea", color: "black" }}
        >
          Fee:{" "}
        </Text>
        
        <TouchableOpacity 
        onPress={() => networkHandler.performTransaction(selectedWallet.address, address, amount)}
        style={{ alignSelf: 'center', marginTop: 60, padding: 15, paddingHorizontal: 40,backgroundColor: 'pink' }} >
        <Text>Send</Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WalletScreen = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState();

  const [isModalVisible, setModalIsVisible] = useState(false);

  const [sendPressed, setSendPressed] = useState(true);

  useEffect(() => {
    async function loadData() {
      networkHandler.getUserData(setWallets, setSelectedWallet);
    }
    loadData();
  }, []);

  let headerProps = {
    wallets: wallets,
    setWallets: setWallets,
    setSelectedWallet: setSelectedWallet,
    setModalIsVisible: setModalIsVisible
  }

  return (
    <View style={styles.walletScreen}>
      <Header
        wallets={wallets}
        setWallets={setWallets}
        setSelectedWallet={setSelectedWallet}
        setModalIsVisible={setModalIsVisible}
        title={"Force load"}
        onPress={async () => {
          let networkHandler = new NetworkHandler();
          networkHandler.getUserData(setWallets, setSelectedWallet);
        }}
      />

      {selectedWallet && wallets.length > 0 ? <TransactionList wallet={selectedWallet} /> : null}
      <CreateWalletModal
        isModalVisible={isModalVisible}
        setModalIsVisible={setModalIsVisible}
      />

      <BottomTab
        showPanel={(val) => _panel.show(val)}
        setSendPressed={setSendPressed}
      />
      <SlidingUpPanel
        ref={(c) => (_panel = c)}
        draggableRange={{ top: sendPressed ? 500 : 200, bottom: 0 }}
        showBackdrop={true}
      >
        {sendPressed ? (
          <SendPanel wallets={wallets} selectedWallet={selectedWallet} />
        ) : (
          <ReceivePanel wallets={wallets} />
        )}
      </SlidingUpPanel>
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
    height: 128,
    backgroundColor: "#E50D7B",
  },
  transactionList: { height: "100%", width: "100%" },
  transactionBox: {
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 70,
    width: "100%",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderColor: "black",
    borderWidth: 0.2,
    flexDirection: "row",
  },
  walletBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginBottom: 0,
    marginLeft: 20,
    height: 70,
    width: 300,
  },
  createWalletBox: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    alignSelf: "auto",
    marginTop: 58,
    marginRight: 20,
    marginBottom: 0,
    marginLeft: 20,
    height: 70,
    width: 50,
  },
  createWalletModal: {
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: "white",
    width: "60%",
    height: "15%",
  },
  fab: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 100,
  },
});
