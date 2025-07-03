'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { app } from '@/lib/firebase';

// Type for our custom user data stored in Firestore
interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    createdAt: any; // Firestore timestamp
    subscription?: {
        planName: string;
        subscriptionId: string;
        status: 'active' | 'cancelled';
        startDate: any;
    };
}

interface AuthContextType {
  user: User | null; // Firebase Auth user object
  appUser: AppUser | null; // Firestore user data
  loading: boolean;
  emailSignUp: (email: string, pass: string) => Promise<any>;
  emailSignIn: (email: string, pass: string) => Promise<any>;
  googleSignIn: () => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to create user document in Firestore
const createUserDocument = async (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    // Check if document already exists to avoid overwriting subscription data on re-login
    await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
    }, { merge: true }); // Use merge to avoid overwriting existing fields
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userRef = doc(db, 'users', authUser.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setAppUser(docSnap.data() as AppUser);
          } else {
            // If the doc doesn't exist, create it. This can happen for users who signed up before this logic was in place.
            createUserDocument(authUser);
          }
          setLoading(false);
        });
        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        setAppUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const emailSignUp = async (email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await createUserDocument(userCredential.user);
    return userCredential;
  };
  
  const emailSignIn = async (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const userCredential = await signInWithPopup(auth, provider);
      await createUserDocument(userCredential.user);
      return userCredential;
  };

  const logout = () => {
    signOut(auth).then(() => {
      router.push('/');
    });
  };

  return (
    <AuthContext.Provider value={{ user, appUser, loading, emailSignUp, emailSignIn, googleSignIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
