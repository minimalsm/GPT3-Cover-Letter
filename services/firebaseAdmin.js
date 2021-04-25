import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from '../secrets.json';


const privateKey = process.env.PRIVATE_KEY;
const clientEmail = process.env.CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROCJECT_ID;

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    });
}

export { firebaseAdmin };

