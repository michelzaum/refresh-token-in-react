import React, { createContext, useCallback, useLayoutEffect, useState } from 'react';

import { AuthService } from '@/services/AuthService';
import { storageKeys } from '@/config/storageKeys';
import { httpClient } from '@/services/httpClient';

interface IAuthContextValue {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageKeys.accessToken);
  });

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(storageKeys.accessToken);

        if (accessToken) {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return config;
      },
    );

    return () => {
      httpClient.interceptors.request.eject(interceptorId);
    };
  }, []);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.refreshToken);

        if (originalRequest.url === '/refresh-token') {
          setSignedIn(false);
          localStorage.clear();
          return Promise.reject(error);
        }

        if ((error.response && error.response.status !== 401) || !refreshToken) {
          return Promise.reject(error);
        }

        const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshToken(refreshToken);

        localStorage.setItem(storageKeys.accessToken, accessToken);
        localStorage.setItem(storageKeys.refreshToken, newRefreshToken);

        return httpClient(originalRequest);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { accessToken, refreshToken } = await AuthService.signIn({ email, password });

    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
