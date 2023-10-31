// Import the functions you need from the SDKs you need
import { initializeApp,getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrUer0JaKmUBFPlCyWbjfDb6vEqUN6hAc",
  authDomain: "controlinventario-f78e9.firebaseapp.com",
  projectId: "controlinventario-f78e9",
  storageBucket: "controlinventario-f78e9.appspot.com",
  messagingSenderId: "703144922693",
  appId: "1:703144922693:web:bfb4586242aafb823bdd2c"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, getApp, getAuth };