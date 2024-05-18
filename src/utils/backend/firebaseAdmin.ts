import { initializeApp, getApps, cert } from 'firebase-admin/app';

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
}
