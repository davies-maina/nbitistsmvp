import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyB92ux6zMA9P13m9glu8HdAY_jfzJV6dqg",
    authDomain: "nbitistsmvp.firebaseapp.com",
    databaseURL: "https://nbitistsmvp.firebaseio.com",
    projectId: "nbitistsmvp",
    storageBucket: "nbitistsmvp.appspot.com",
    messagingSenderId: "12966513310",
    appId: "1:12966513310:web:30d5bf5578278d02ef498f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();