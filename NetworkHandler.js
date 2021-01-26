import firebase, { auth } from './firebase';
import { add } from 'react-native-reanimated';

export default class NetworkHandler {

    async getUserData(setWallets, setSelectedWallet) {
        let wallets = []

        let ref = firebase.firestore().collection('users').doc('user').collection('wallets')

        ref.onSnapshot((snapShot) => {
            snapShot.forEach((col) => {
                let address = col.id;
                let balance = col.data().balance

                let transactions = [];
                let ref = firebase.firestore().collection('users').doc('user').collection('wallets').doc(address).collection('transactions')
                
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
                        
        /*
        let networker = new Networker();
  networker.getUserData();

        */
       

    }


}