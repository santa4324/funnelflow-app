'use client';
import React, { createContext, useContext, ReactNode } from 'react';

// This context is temporarily disabled to resolve build issues.
const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = { user: null, loading: false };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return { user: null, loading: true };
  }
  return context;
};
