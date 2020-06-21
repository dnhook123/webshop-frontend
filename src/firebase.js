  
  import firebase from 'firebase';
require("firebase/firestore");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCkaBk-GPle6wlPOomzCI6AmcCJ-9laEaw",
    authDomain: "webshop-f0820.firebaseapp.com",
    databaseURL: "https://webshop-f0820.firebaseio.com",
    projectId: "webshop-f0820",
    storageBucket: "webshop-f0820.appspot.com",
    messagingSenderId: "456289149794",
    appId: "1:456289149794:web:aa4aa9e85593feee69423b",
    measurementId: "G-X0R76MM5TH"
  };

  const fb = firebase.initializeApp(config);
  const db = firebase.firestore();
  
  export {db, fb}
