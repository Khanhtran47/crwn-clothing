import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCddlX4uWr99n2gOY_Yev3S_QSOU0GqQO8',
  authDomain: 'crwn-2fb71.firebaseapp.com',
  databaseURL: 'https://crwn-2fb71.firebaseio.com',
  projectId: 'crwn-2fb71',
  storageBucket: 'crwn-2fb71.appspot.com',
  messagingSenderId: '1023450186479',
  appId: '1:1023450186479:web:e12b44a0af3be8c255111a',
  measurementId: 'G-WK67QK30R4',
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
