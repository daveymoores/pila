import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { useRouter } from "next/router";
import nookies from "nookies";
import React, {
  type Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { createUser } from "./db";
import { getFirebaseAuth } from "./firebase";
import {
  getMockAuthEmail,
  isMockAuthCredentials,
  isMockIntegrations,
  MOCK_AUTH_TOKEN,
  MOCK_AUTH_UID,
} from "./mock-config";

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
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void> | undefined;
  signOut: () => Promise<void> | undefined;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  signInWithEmailAndPassword: async () => {
    // noop
  },
  signOut: async () => {
    // noop
  },
});

const formatAuthState = (user: User): Auth => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photoUrl: user.photoURL,
  token: null,
});

function useProvideAuth() {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuthChange = useCallback(
    async (authState: User | null) => {
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
      await router.push("/account/sessions");
    },
    [router],
  );

  const signedIn = async (user: User) => {
    const authedUser = formatAuthState(user);
    await createUser(authedUser.uid, authedUser);
  };

  const clear = async () => {
    setAuth(null);
    setLoading(false);
    await router.push("/");
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);

    if (isMockIntegrations() && isMockAuthCredentials(email, password)) {
      const mockAuth: Auth = {
        uid: MOCK_AUTH_UID,
        email: getMockAuthEmail(),
        name: "PILA Dev User",
        photoUrl: null,
        token: MOCK_AUTH_TOKEN,
      };

      nookies.set(undefined, "token", MOCK_AUTH_TOKEN, { path: "/" });
      setAuth(mockAuth);
      setLoading(false);
      void router.push("/account/sessions");
      return;
    }

    return signInWithEmailAndPassword(getFirebaseAuth(), email, password)
      .then(async (credential) => {
        if (credential.user) {
          await signedIn(credential.user);
        }
      })
      .catch(clear);
  };

  const signOutUser = () => {
    if (isMockIntegrations()) {
      nookies.set(undefined, "token", "", { path: "/" });
      return clear();
    }

    return signOut(getFirebaseAuth()).then(clear);
  };

  useEffect(() => {
    if (isMockIntegrations()) {
      const token = nookies.get(undefined).token;

      if (token === MOCK_AUTH_TOKEN) {
        setAuth({
          uid: MOCK_AUTH_UID,
          email: getMockAuthEmail(),
          name: "PILA Dev User",
          photoUrl: null,
          token: MOCK_AUTH_TOKEN,
        });
      }

      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), handleAuthChange);
    return () => unsubscribe();
  }, [handleAuthChange]);

  return {
    auth,
    loading,
    signInWithEmailAndPassword: signIn,
    signOut: signOutUser,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
