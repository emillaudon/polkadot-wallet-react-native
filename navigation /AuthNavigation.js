import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import { AuthContext } from '../AuthContext';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
  } from "react-native";

export default function AuthNavigation() {
    const { user, isLoading } = useContext(AuthContext);
    

    if(isLoading) {
        return (
            <View>
                <Text>c</Text>

            </View>
        );
    } 
    return (
        <NavigationContainer>
            {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
        </NavigationContainer>
    );

}