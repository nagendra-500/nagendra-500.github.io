import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC6exrP2h4be6k1MaQBP1sHFqwS1kV2e4c",
    authDomain: "apptitans.firebaseapp.com",
    databaseURL: "https://apptitans.firebaseio.com",
    projectId: "apptitans",
    storageBucket: "",
    messagingSenderId: "721913454836",
    appId: "1:721913454836:web:68de7e40f92c5197",
    measurementId: "G-GPY6K4H2N4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth, db };
