import * as admin from "firebase-admin";

const serviceAccount = require(`${process.env.SERVICE_ACCOUNT_FILE_PATH}service-account.json`);

// Initialize Firebase Admin SDK with service account credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const firebaseAuth = admin.auth();

export default firebaseAuth;
