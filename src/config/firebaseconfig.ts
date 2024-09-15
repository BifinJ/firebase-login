import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { env } from "process";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();
// GitHub Provider
const githubProvider = new GithubAuthProvider();

// Email/Password Sign-Up
const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) console.log("User signed up successfully:", user);
    else console.log("error occured");

    await sendEmailVerification(user);
  } catch (error: any) {
    console.error("Error signing up:", error.code, error.message);
  }
};

// Email/Password Sign-In
const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user.emailVerified) {
      console.log("User logged in successfully and email is verified:", user);
    } else {
      console.log("Email not verified. Please verify your email.");
    }
  } catch (error: any) {
    console.error("Error logging in:", error.code, error.message);
  }
};

// Google Authentication
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google user signed in:", user);
  } catch (error: any) {
    console.error("Error during Google login:", error.code, error.message);
  }
};

// GitHub Authentication
const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    console.log("GitHub user signed in:", user);
  } catch (error: any) {
    console.error("Error during GitHub login:", error.code, error.message);
  }
};

// Sign-Out
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export {
  auth,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  signInWithGoogle,
  signInWithGitHub,
  logout,
};
