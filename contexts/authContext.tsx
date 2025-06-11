"use client";

import Messages from "@/types/Messages";
import { createContext, useEffect, useState } from "react";
// import { auth } from "@/utils/firebase/index";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   User,
// } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { languages } from "@/utils/translations";

export interface AuthContextType {
  user: { uid: string; name: string; photoURL: string } | null | undefined;
  //   loading: boolean;
  googleLoginHandler: () => Promise<string | null>;
  logout: () => void;
  messages: Messages;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function AuthContextProvider({ children }: Props) {
  const [messages, setMessages] = useState<Messages>(
    languages.find((l) => l.lang === "pt-br")!.messages
  );

  useEffect(() => {
    setMessages(languages.find((l) => l.lang === "pt-br")!.messages);
  }, []);

  //   const [user, loading] = useAuthState(auth);
  const [user, setUser] = useState<
    { uid: string; name: string; photoURL: string } | null | undefined
  >(null);

  //   const googleProvider = new GoogleAuthProvider();
  //   googleProvider.addScope("profile");
  //   googleProvider.addScope("email");

  const googleLoginHandler = async () => {
    // try {
    //   const result = await signInWithPopup(auth, googleProvider);
    //   return result.user.uid;
    // } catch (error) {
    //   return null;
    // }
    setUser({ uid: "user123", name: "Irineu", photoURL: "/vercel.svg" });
    return null;
  };

  const logout = () => {
    // signOut(auth);
    setUser(null);
  };

  const values: AuthContextType = {
    user,
    // loading,
    googleLoginHandler,
    logout,
    messages,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
