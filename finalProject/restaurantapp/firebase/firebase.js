import app from 'firebase/app'; /* dds*/
//import firebaseConfig from './config';
import 'firebase/firestore'/* dds*/
const firebaseConfig = {
    databaseURL: 'https://restaurant-1b690.firebaseio.com',
    apiKey: "AIzaSyDIyfLmfmD6vx-gMLR2kkANtJTA_7LjL3w",
    authDomain: "restaurant-1b690.firebaseapp.com",
    projectId: "restaurant-1b690",
    storageBucket: "restaurant-1b690.appspot.com",
    messagingSenderId: "938629407728",
    appId: "1:938629407728:web:b8d63dffc1272c8cfcb335",
    measurementId: "G-T7ZWFK5N1E"
  };
class Firebase{
    constructor(){
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
            app.firestore().settings({ experimentalForceLongPolling: true });
         }
        this.db=app.firestore()
    }
   
}

const firebase = new Firebase();
export default firebase;