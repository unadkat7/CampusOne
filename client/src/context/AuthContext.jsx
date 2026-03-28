import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and provides authentication state globally.
 *
 * - On mount, checks localStorage for an existing token and validates it via /api/auth/me
 * - Provides login() and logout() functions
 * - Stores current user object and role
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if there's a valid token in localStorage
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("campusone_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        // Token is invalid or expired — clear it
        console.error("Token validation failed:", error);
        localStorage.removeItem("campusone_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  /**
   * Login — authenticates user and stores token + user data.
   * @param {string} email
   * @param {string} password
   * @returns {Object} user data on success
   * @throws {Error} on failure
   */
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, user: userData } = response.data;

    localStorage.setItem("campusone_token", token);
    setUser(userData);

    return userData;
  };

  /**
   * Logout — clears token and user state.
   */
  const logout = () => {
    localStorage.removeItem("campusone_token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to access auth context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
