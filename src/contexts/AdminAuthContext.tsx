import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AdminAuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

type AdminAuthProviderProps = {
  children: ReactNode;
};

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Failed to get session:", error.message);
      }

      if (!mounted) return;

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }

    setSession(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      session,
      user,
      loading,
      isAuthenticated: !!session,
      signOut,
    }),
    [session, user, loading]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }

  return context;
}