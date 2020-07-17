import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBZsB_D4UTxh431xrspPVNUkmspVtJzWZM",
  authDomain: "crwn-db-916cf.firebaseapp.com",
  databaseURL: "https://crwn-db-916cf.firebaseio.com",
  projectId: "crwn-db-916cf",
  storageBucket: "crwn-db-916cf.appspot.com",
  messagingSenderId: "945524746034",
  appId: "1:945524746034:web:1e2cad233145a1242c992b",
  measurementId: "G-KXVR7N519P",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
