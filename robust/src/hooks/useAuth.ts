// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { account, ID } from "@/db/appwrite";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    const loggedUser = await account.get();
    setUser(loggedUser);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password); // automatisk logg inn etter register
  }

  async function fetchUser() {
    try {
      const current = await account.get();
      setUser(current);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, login, logout, register };

  
}
