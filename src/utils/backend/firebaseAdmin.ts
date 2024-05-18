import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY
    })
}

export const customInitApp = () => {
    if (getApps().length <= 0) {
        return initializeApp(firebaseAdminConfig);
    }
    return getApps()[0];
}

const app = customInitApp();
export const db = getFirestore(app);
