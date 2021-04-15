import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyABISOgFLnxSuBX4yrBOtiyhAqo2xr0XYg",
    authDomain: "letscrum-9effb.firebaseapp.com",
    projectId: "letscrum-9effb",
    storageBucket: "letscrum-9effb.appspot.com",
    messagingSenderId: "211847015322",
    appId: "1:211847015322:web:f3ab41dd6e50f2f675a823",
    measurementId: "G-4RQXHLBC88"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google auth configuration:
const provider = new firebase.auth.GoogleAuthProvider();
//always trigger the google popup whenever we use the GoogleAuthProvider for authentication and signIn
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
