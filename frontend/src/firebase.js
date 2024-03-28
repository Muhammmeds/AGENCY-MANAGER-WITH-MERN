import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC0-G62RX0s4-HNNaSaR_uiPBH4AeHVg1s",
  authDomain: "fir-tutorial-2ef80.firebaseapp.com",
  projectId: "fir-tutorial-2ef80",
  storageBucket: "fir-tutorial-2ef80.appspot.com",
  messagingSenderId: "843744918170",
  appId: "1:843744918170:web:190e616c814ef4d7d87d23"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)