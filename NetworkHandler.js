import firebase, { auth } from './firebase';
import { add } from 'react-native-reanimated';

const url = 'http://192.168.1.14:3000';
let user = 'user'

export default class NetworkHandler {

    async getUserData(setWallets, setSelectedWallet) {
        user = auth.currentUser.uid;
        console.log(user);
        

        let ref = firebase.firestore().collection('users').doc(user).collection('wallets')

        ref.onSnapshot((snapShot) => {
            let wallets = [];
            snapShot.forEach((col) => {
                let address = col.id;
                let balance = col.data().balance

                let wallet = {
                    address: address,
                    balance: balance,
                    
                }

                let transactionsData = [];
                let ref = firebase.firestore().collection('users').doc(user).collection('wallets').doc(address).collection('transactions')
                
                ref.onSnapshot((snapShot) => {
                    console.log(1)

                    /*
                    snapShot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            let transaction = change.doc.data();
                            console.log(change.doc.id)
                            console.log(change.doc.data());
                            console.log(transaction.ref)
                            transactions.push(transaction);
                        }
                    })
                    */

                    snapShot.forEach((transaction) => {
                        let transactionFound = false;

                        transactionsData.forEach((transactionInArray) => {
                            console.log(transactionInArray.id);
                            console.log(transaction.id);
                            console.log(transactionInArray.id === transaction.id)
                            if(transactionInArray.id === transaction.id) {
                                let index = transactionsData.indexOf(transactionInArray);
                                transactionsData[index] = transaction;
                                transactionFound = true;
                            } 
                        })
                        if(!transactionFound) {
                            transactionsData.push(transaction);
                        }
                        
                        let walletFound = false;

                        wallets.forEach((walletInArray) => {
                            if(walletInArray.address === wallet.address) {
                                let index = wallets.indexOf(walletInArray);
                                wallets[index] = wallet;
                                walletFound = true;
                            } 
                        })
                        if(!walletFound) {
                            wallets.push(wallet);
                        }
                    })
                    
                    
                    

                    wallet = {
                        ...wallet,
                        transactions: transactionsData
                    }
                    let walletFound = false;

                    wallets.forEach((walletInArray) => {
                        if(walletInArray.address === wallet.address) {
                            let index = wallets.indexOf(walletInArray);
                            wallets[index] = wallet;
                            walletFound = true;
                        } 
                    })
                    if(!walletFound) {
                        wallets.push(wallet);
                    }
                    console.log(2)
                    setWallets((oldWallets) => {

                        setSelectedWallet((old) => old)
                        return wallets
                    })  
                    
                    
                });
            })
            
            //setWallets(wallets)  
                 
        })
    }

    async generateNewWallet() {
        let response = await fetch(url + '/generateWallet/' + user);
        let responseString = await response.text();
        
        return responseString;
    }


}