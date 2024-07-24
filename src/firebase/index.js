// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIUpIQmiXPQrjgcqeHu6JBnPvIY7j1yXY",
  authDomain: "fir-ilk-cbb19.firebaseapp.com",
  projectId: "fir-ilk-cbb19",
  storageBucket: "fir-ilk-cbb19.appspot.com",
  messagingSenderId: "826538510935",
  appId: "1:826538510935:web:11a823c8749698ead37112",
  measurementId: "G-EHCMZBNP13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// firebase auth referansını al
export const auth = getAuth(app)

// google sağlayıcısını kur
export const provider = new GoogleAuthProvider()

// firestore veritabanı referansını al
export const db = getFirestore(app)