// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyClloMTzOnitT_XbJcHLqPQoAVbdWKEOsk",
  authDomain: "clone-91e80.firebaseapp.com",
  projectId: "clone-91e80",
  storageBucket: "clone-91e80.appspot.com",
  messagingSenderId: "108102303907",
  appId: "1:108102303907:web:269bdf630ba2043f2a7f16"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
