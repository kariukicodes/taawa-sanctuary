import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAdminAuth();

  const redirectTo =
    (location.state as { from?: string } | null)?.from || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Failed to sign in");
      }

      toast.success("Logged in successfully");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F4] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-[#e6ece8] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="mb-2 inline-flex rounded-full border border-[#d9e3dc] bg-[#f7faf7] px-4 py-1 text-xs font-medium text-[#355847]">
            Taawa CRM
          </p>
          <h1 className="text-3xl font-bold text-[#17252A]">Admin Login</h1>
          <p className="mt-2 text-sm text-[#5f6f68]">
            Sign in to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#355847]">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-2xl border border-[#d9e3dc] bg-white px-4 py-3 text-sm text-[#17252A] outline-none focus:border-[#355847]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#355847]">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-2xl border border-[#d9e3dc] bg-white px-4 py-3 text-sm text-[#17252A] outline-none focus:border-[#355847]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-[#d7f36a] px-4 py-3 text-sm font-semibold text-[#17252A] transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;