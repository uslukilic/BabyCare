import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);

  const role = decoded.role || decoded.roles || decoded[ROLE_CLAIM];

  return {
    loggedIn: true,
    role,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(getUserFromToken());
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
