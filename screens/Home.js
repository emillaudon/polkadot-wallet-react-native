import React, { useState, useEffect } from 'react';
import NetworkHandler from '../NetworkHandler';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Header from '../components/Header';
import TransactionList from '../components/TransactionList';
import BottomTab from '../components/BottomTab';
import CreateWalletModal from '../components/CreateWalletModal';
import ReceivePanel from '../components/ReceivePanel';
import SendPanel from '../components/SendPanel';

import { StyleSheet, View } from 'react-native';

let networkHandler = new NetworkHandler();

const WalletScreen = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState();

  const [isModalVisible, setModalIsVisible] = useState(false);

  const [sendPressed, setSendPressed] = useState(true);

  let _panel;

  useEffect(() => {
    async function loadData() {
      networkHandler.getUserData(setWallets, setSelectedWallet);
    }
    loadData();
  }, []);

  return (
    <View style={styles.walletScreen}>
      <Header
        wallets={wallets}
        setWallets={setWallets}
        setSelectedWallet={setSelectedWallet}
        setModalIsVisible={setModalIsVisible}
        title={'Force load'}
        onPress={async () => {
          let networkHandler = new NetworkHandler();
          networkHandler.getUserData(setWallets, setSelectedWallet);
        }}
      />

      {selectedWallet && wallets.length > 0 ? (
        <TransactionList wallet={selectedWallet} />
      ) : null}
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

export default function Home() {
  return <WalletScreen />;
}

const styles = StyleSheet.create({
  walletScreen: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
