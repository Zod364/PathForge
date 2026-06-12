import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("skillmap_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("skillmap_token"));

  useEffect(() => {
    if (token) localStorage.setItem("skillmap_token", token);
    else localStorage.removeItem("skillmap_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("skillmap_user", JSON.stringify(user));
    else localStorage.removeItem("skillmap_user");
  }, [user]);

  const login = async (email, password) => {
    const { data } = await api.post("/api/auth/login", { email, password });
    setToken(data.token); setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post("/api/auth/register", payload);
    setToken(data.token); setUser(data.user);
    return data.user;
  };

  const logout = () => { setToken(null); setUser(null); };

  const isAdmin = !!user?.roles?.includes?.("ROLE_ADMIN");

  return (
    <Ctx.Provider value={{ user, token, isAdmin, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
