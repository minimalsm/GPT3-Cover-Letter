import * as admin from 'firebase-admin';
import serviceAccount from '../secrets.json';

const verifyIdTokens = async (token) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
        });
    }
    return admin.auth().verifyIdToken(token).catch((error) => {
        throw error;
    })
}
export default verifyIdTokens;

