const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./pushcartping.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();


// const firebaseConfig = {
//     apiKey: "AIzaSyBQubaqE2aJuw8Sir8OxwaWaeKP9u6GYcA",
//     authDomain: "pushcartping.firebaseapp.com",
//     projectId: "pushcartping",
//     databaseURL: "https://pushcartping.firebaseio.com",
//     storageBucket: "pushcartping.appspot.com",
//     messagingSenderId: "821602070633",
//     appId: "1:821602070633:android:c0775063458410d68a72f8"
// };

// const app = firebase.initializeApp(firebaseConfig);
// const db = firedb.getFirestore(app);
// firebase.auth().setPersistence(
//     firebase.auth.Auth.Persistence.NONE);
// const author = fb.getAuth();
// const storage = firebase.storage.getStorage();
// const db = firebase.firestore.getFirestore(app);

module.exports = db;
