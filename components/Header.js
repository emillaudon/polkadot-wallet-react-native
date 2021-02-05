import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import WalletBox from './WalletBox';
import CreateWalletBox from './CreateWalletBox';

const Header = ({
  wallets,
  setWallets,
  setSelectedWallet,
  setModalIsVisible,
}) => {
  const logo = require('../assets/logo.png');

  return (
    <View style={styles.header}>
      <ImageBackground source={logo} style={styles.imageBackground}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={wallets}
          renderItem={({ item, index }) => (
            <WalletBox item={item} setSelectedWallet={setSelectedWallet} />
          )}
          keyExtractor={(item, index) => (item.key = 'key' + index)}
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

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 128,
    backgroundColor: '#E50D7B',
  },
  imageBackground: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
});
