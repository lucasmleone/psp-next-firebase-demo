import admin from 'firebase-admin';

// Evitamos inicializar la app varias veces si ya está corriendo
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Esto es un truco para que funcione el salto de línea en las variables de entorno
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export const adminDb = admin.firestore();