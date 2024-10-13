import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  NextOrObserver,
  User,
  Auth,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const signInUser = async (email: string, password: string) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpUser = async (
  auth: Auth,
  email: string,
  password: string
) => {
  if (!auth && !email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const updateUser = (
  user: User,
  { displayName, photoURL }: { displayName?: string; photoURL?: string }
) => {
  if (!user) return;

  return updateProfile(user, { displayName: displayName, photoURL: photoURL });
};

export const auth = getAuth(app);

export const db = getFirestore(app);
