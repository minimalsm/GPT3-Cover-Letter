import firebase from 'firebase';
import "firebase/auth";
import firebaseClient from "firebase/app";


const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
    // firebaseClient
    //     .auth()
    //     .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
}

export { firebaseClient };