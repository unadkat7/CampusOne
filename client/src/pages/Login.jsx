import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Login Page — professional login interface with CampusOne branding.
 * No registration option. Single form with email and password.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userData = await login(email, password);

      // Redirect based on role
      const roleRoutes = {
        student: "/student/dashboard",
        faculty: "/faculty/dashboard",
        admin: "/admin/dashboard",
      };

      navigate(roleRoutes[userData.role] || "/login", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Campus<span className="text-blue-400">One</span>
          </h1>
          <p className="text-blue-200/60 mt-2 text-sm">
            Unified Digital Campus Management Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <div className="card-body p-8">
            <h2 className="text-xl font-semibold text-white text-center mb-1">
              Welcome Back
            </h2>
            <p className="text-blue-200/50 text-center text-sm mb-6">
              Sign in with your campus credentials
            </p>

            {/* Error Alert */}
            {error && (
              <div className="alert alert-error bg-red-500/20 border border-red-500/30 text-red-200 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text text-blue-200/70 text-sm">
                    Email Address
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@campusone.edu"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-white/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="form-control mb-6">
                <label className="label" htmlFor="password">
                  <span className="label-text text-blue-200/70 text-sm">
                    Password
                  </span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white placeholder-white/30 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="login-btn"
                className={`btn w-full border-0 text-white font-semibold text-base ${
                  isLoading
                    ? "bg-blue-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                } transition-all duration-200`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="divider text-white/20 text-xs my-4">
              CAMPUS PORTAL
            </div>

            <p className="text-center text-blue-200/40 text-xs">
              Credentials are provided by your institution.
              <br />
              Contact admin if you need access.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-200/30 text-xs mt-6">
          © 2025 CampusOne. All rights reserved.
        </p>
      </div>
    </div>
  );
}
