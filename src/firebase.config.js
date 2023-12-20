import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCkn49-_A0Y8PR_BV0iMeKOUW6Z7Ww-J5k",
  authDomain: "fooddeliveryapp-ad77e.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-ad77e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fooddeliveryapp-ad77e",
  storageBucket: "fooddeliveryapp-ad77e.appspot.com",
  messagingSenderId: "450917064476",
  appId: "1:450917064476:web:972a86d9af590e2388a4d9"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
