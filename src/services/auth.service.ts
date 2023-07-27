/**
 * Firebase Authentication Service
 */

import firebaseAuth from "../config/firebase.config";

export const verifyToken = async (token: string) => {
  try {
    return {
      status: true,
      data: await firebaseAuth.verifyIdToken(token),
    };
  } catch (error: any) {
    console.error("Error verifying id token:", error.message);
    return {
      status: false,
    };
  }
};
