import { useAuth } from "./useAuth";

export function useAdmin() {
  const { user, loading } = useAuth();

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const isAdmin = user?.email === adminEmail;

  return { user, loading, isAdmin };
}
