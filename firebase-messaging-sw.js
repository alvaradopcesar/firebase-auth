importScripts("https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.4/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyAA5ebs4uBYsNoxvKW5lh4m0pspVCPdUrM",
    authDomain: "seonteamtest.firebaseapp.com",
    databaseURL: "https://seonteamtest.firebaseio.com",
    projectId: "seonteamtest",
    storageBucket: "seonteamtest.appspot.com",
    messagingSenderId: "306301973508",
    appId: "1:306301973508:web:8ea29f354693169c8e7151",
    measurementId: "G-GGJNBLG43R"
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();