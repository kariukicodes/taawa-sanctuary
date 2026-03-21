import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    navigate("/admin/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-taawa-bg flex items-center justify-center px-4">
      <div className="bg-white rounded-[20px] border border-taawa-lime/20 shadow-card p-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-8 h-8 bg-taawa-lime flex-shrink-0"
            style={{ borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}
          />
          <div>
            <div className="font-syne font-bold text-taawa-green text-lg leading-tight">
              Taawa CRM
            </div>
            <div className="text-taawa-muted text-xs">Admin Dashboard</div>
          </div>
        </div>

        <h1 className="font-syne font-bold text-taawa-text text-xl mb-1">
          Welcome back
        </h1>
        <p className="text-taawa-muted text-sm mb-8">
          Sign in to manage bookings and contacts
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-taawa-muted uppercase tracking-wide mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@taawa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-taawa-bg2 border border-taawa-lime/20 rounded-full px-5 py-3 font-instrument text-sm text-taawa-text outline-none transition-all focus:border-taawa-sage focus:bg-white placeholder:text-taawa-muted/60"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-taawa-muted uppercase tracking-wide mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-taawa-bg2 border border-taawa-lime/20 rounded-full px-5 py-3 font-instrument text-sm text-taawa-text outline-none transition-all focus:border-taawa-sage focus:bg-white placeholder:text-taawa-muted/60"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-taawa-green text-white font-medium py-3 px-6 rounded-full hover:bg-taawa-sage transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p className="text-center text-taawa-muted text-xs mt-6">
          Taawa Counselling · Admin Portal
        </p>
      </div>
    </div>
  );
}