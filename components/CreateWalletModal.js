import React, { useState } from 'react';
import NetworkHandler from '../NetworkHandler';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

let networkHandler = new NetworkHandler();

const CreateWalletModal = ({ isModalVisible, setModalIsVisible }) => {
  return (
    <Modal visible={isModalVisible} transparent={true}>
      <View style={styles.createWalletModalBG}>
        <View style={styles.createWalletModal}>
          <TouchableOpacity
            onPress={() => {
              setModalIsVisible(false);
            }}
            style={{}}
          >
            <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>
              x
            </Text>
          </TouchableOpacity>

          <Text
            style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}
          >
            Generate new wallet?
          </Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
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

export default CreateWalletModal;

const styles = StyleSheet.create({
  createWalletModal: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '60%',
    height: '15%',
  },
  createWalletModalBG: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(1, 1, 1, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
