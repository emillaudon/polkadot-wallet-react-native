import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = ({ showPanel, setSendPressed }) => {
  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity
        onPress={() => {
          setSendPressed(true);
          showPanel(500);
        }}
      >
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={'arrow-up-bold-hexagon-outline'}
            brand
            size={40}
            color={'black'}
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
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name={'archive-arrow-down-outline'}
            brand
            size={40}
            color={'black'}
          />
          <Text> Receive </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomTab: {
    height: '9%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: 'black',
    borderWidth: 0.2,
  },
  icon: { flexDirection: 'column', alignItems: 'center' },
});
