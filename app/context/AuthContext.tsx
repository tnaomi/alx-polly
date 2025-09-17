"use client";

import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const AuthContext = createContext<Session | null>(null);

export const AuthProvider = ({ children, session }: { children: React.ReactNode, session: Session | null }) => {
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);