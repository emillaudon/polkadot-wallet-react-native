import firebase, { auth } from './firebase';
import { add } from 'react-native-reanimated';

const url = 'http://192.168.1.14:3000';
let user = 'user'

export default class NetworkHandler {

    async getUserData(setWallets, setSelectedWallet) {
        user = auth.currentUser.uid;
        console.log(user);
        let wallets = []

        let ref = firebase.firestore().collection('users').doc(user).collection('wallets')

        ref.onSnapshot((snapShot) => {
            snapShot.forEach((col) => {
                let address = col.id;
                let balance = col.data().balance

                let transactions = [];
                let ref = firebase.firestore().collection('users').doc(user).collection('wallets').doc(address).collection('transactions')
                
                ref.onSnapshot((snapShot) => {
                    snapShot.forEach((transaction) => {
                        transactions.push(transaction.data());
                    })
                    setSelectedWallet(wallets[0])
                });

                let wallet = {
                    address: address,
                    balance: balance,
                    transactions: transactions,
                }

                wallets.push(wallet);
                
            })
            setWallets(wallets)          
        })
    }

    async generateNewWallet() {
        let response = await fetch(url + '/generateWallet/' + user);
        let responseString = await response.text();
        
        return responseString;
    }


}