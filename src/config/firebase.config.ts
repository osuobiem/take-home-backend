import * as admin from "firebase-admin";
import serviceAccount from "./service-account.json";

// Initialize Firebase Admin SDK with service account credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const firebaseAuth = admin.auth();

export default firebaseAuth;
