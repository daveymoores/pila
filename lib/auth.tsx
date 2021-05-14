import { useRouter } from "next/router";
import nookies from "nookies";
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

export interface AuthContext {
  auth: Auth | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void> | undefined;
  signOut: () => Promise<void> | undefined;
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
  const router = useRouter();
  const [firebaseAuth, setFirebaseAuth] = useState<firebase.auth.Auth | null>(
    null
  );

  useEffect(() => {
    import("firebase/auth")
      .then(() => {
        const appAuth = firebase.auth();
        setFirebaseAuth(appAuth);
      })
      .catch((error) => {
        console.error("Unable to lazy-load firebase/auth:", error);
      });
  }, []);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthChange = async (authState: firebase.User | null) => {
    if (!authState) {
      setAuth(null);
      nookies.set(undefined, "token", "", { path: "/" });
      return;
    }

    try {
      const result = await fetch("/api/user", {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
      });

      const data = await result.json();

      //token is valid, don't redirect to sessions page
      const formattedAuth = formatAuthState(authState);
      setAuth(formattedAuth);
      setLoading(false);
      if (data.uid) return;
    } catch (err) {
      console.error(err);
    }

    const formattedAuth = formatAuthState(authState);
    formattedAuth.token = await authState.getIdToken();
    nookies.set(undefined, "token", formattedAuth.token, { path: "/" });
    setAuth(formattedAuth);
    setLoading(false);
    router.push("/account/sessions");
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
    setLoading(false);
    router.push("/");
  };

  const signInWithGoogle = () => {
    if (!firebaseAuth) return;
    setLoading(true);

    return firebaseAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(signedIn, clear);
  };

  const signOut = () => {
    if (!firebaseAuth) return;
    return firebaseAuth.signOut().then(clear);
  };

  useEffect(() => {
    if (!firebaseAuth) return;
    const unsubscribe = firebaseAuth.onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  }, [firebaseAuth]);

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
