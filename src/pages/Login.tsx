import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

type LocationState = {
  from?: string;
};

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const state = location.state as LocationState | null;
  const redirectPath = state?.from || "/dashboard";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectPath, { replace: true });
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 landing-atmosphere">
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight relative">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-7 sm:p-8"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 glow-border flex items-center justify-center mb-5">
                <Shield className="w-5 h-5 text-primary" />
              </div>

              <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground text-sm mb-6">Sign in to continue tracking your disposal impact.</p>

              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium mb-1.5 block">Email</span>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-medium mb-1.5 block">Password</span>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25"
                      autoComplete="current-password"
                      minLength={6}
                      required
                    />
                  </div>
                </label>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <p className="text-sm text-muted-foreground mt-6">
                Want to explore first? <Link to="/" className="text-primary hover:underline">Back to home</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
