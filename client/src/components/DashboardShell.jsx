import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * DashboardShell — shared layout wrapper for all dashboard pages.
 * Provides a navbar with branding, user info, and logout button.
 */
const roleColors = {
  student: "from-blue-600 to-cyan-500",
  faculty: "from-emerald-600 to-teal-500",
  admin: "from-purple-600 to-pink-500",
};

const roleLabels = {
  student: "Student Portal",
  faculty: "Faculty Portal",
  admin: "Admin Portal",
};

export default function DashboardShell({ children, role, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-base-200" data-theme="light">
      {/* Navbar */}
      <div className={`navbar bg-gradient-to-r ${roleColors[role] || "from-gray-600 to-gray-500"} text-white shadow-lg`}>
        <div className="navbar-start">
          <div className="flex items-center gap-2 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span className="text-lg font-bold tracking-tight">
              Campus<span className="opacity-80">One</span>
            </span>
            <span className="badge badge-ghost badge-sm text-white/70 border-white/30 ml-2 hidden sm:inline-flex">
              {roleLabels[role]}
            </span>
          </div>
        </div>

        <div className="navbar-center hidden md:flex">
          <h1 className="text-lg font-semibold opacity-90">{title}</h1>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-tight">{user?.name}</p>
              <p className="text-xs opacity-70">{user?.email}</p>
            </div>
            <button
              id="logout-btn"
              className="btn btn-ghost btn-sm text-white hover:bg-white/20 border-white/30"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
