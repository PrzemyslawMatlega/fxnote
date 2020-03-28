import firebase from 'firebase/app'
import 'firebase/firebase-storage'
import 'firebase/database'

let config = {
    apiKey: "AIzaSyCKU6zPbsU0UALnq3a0CdLmyUsHde4zcvA",
    authDomain: "react-fire-5848c.firebaseapp.com",
    databaseURL: "https://react-fire-5848c.firebaseio.com",
    projectId: "react-fire-5848c",
    storageBucket: "react-fire-5848c.appspot.com",
    messagingSenderId: "31319216368",
    appId: "1:31319216368:web:a92b9408976c1213ff7235"
};
firebase.initializeApp(config);

export default firebase;