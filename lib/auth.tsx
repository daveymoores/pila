import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { createUser } from "./db";
import firebase from "./firebase";

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  token: string | null;
}

interface AuthContext {
  auth: Auth | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  signInWithGoogle: async () => {
    //noop
  },
  signOut: async () => {
    //noop
  },
});

const formatAuthState = (user: firebase.User): Auth => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photoUrl: user.photoURL,
  token: null,
});

function useProvideAuth() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAuthChange = async (authState: firebase.User | null) => {
    if (!authState) {
      return;
    }

    const formattedAuth = formatAuthState(authState);
    formattedAuth.token = await authState.getIdToken();
    setAuth(formattedAuth);
    setLoading(false);
  };

  const signedIn = async (response: firebase.auth.UserCredential) => {
    if (!response.user) {
      throw new Error("No User");
    }

    const authedUser = formatAuthState(response.user);
    await createUser(authedUser.uid as string, authedUser);
  };

  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(signedIn);
  };

  const signOut = () => {
    return firebase.auth().signOut().then(clear);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  }, []);

  return {
    auth,
    loading,
    signInWithGoogle,
    signOut,
  };
}

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
