import { AuthService } from '@/services/AuthService';
import React, { createContext, useCallback } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({
      email,
      password
    });

    console.log({ accessToken, refreshToken });
  }, []);

  const value: IAuthContextValue = {
    signedIn: false,
    signIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
