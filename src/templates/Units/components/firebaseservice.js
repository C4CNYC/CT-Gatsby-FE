const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyAtKwvB8Y1_uurvx_XxB6S_FZ8tzHXKWEM",
  authDomain: "mobe-68275.firebaseapp.com",
  databaseURL: "https://mobe-68275.firebaseio.com",
  projectId: "mobe-68275",
  storageBucket: "mobe-68275.appspot.com",
  messagingSenderId: "105172992108",
  appId: "1:105172992108:web:eb198aefdf2707df4b5849"
}

app = firebase.initializeApp(firebaseConfig);
Auth = firebase.auth();