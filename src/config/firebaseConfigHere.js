// RENOMEAR O ARQUIVO PARA 'firebase.js'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
//   firebase.analytics();