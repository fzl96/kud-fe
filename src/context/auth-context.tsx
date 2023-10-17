import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: () => {},
});

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<any>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
