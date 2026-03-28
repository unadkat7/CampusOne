import { useAuth } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";

/**
 * AdminDashboard — shell page for the admin role.
 * Accessible only to authenticated users with role "admin".
 */
export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <DashboardShell role="admin" title="Admin Dashboard">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            👋 Welcome, {user?.name || "Administrator"}!
          </h2>
          <p className="text-base-content/60 mt-2">
            You are logged in as <span className="badge badge-accent">Admin</span> with full system access.
          </p>
          <div className="divider"></div>
          <p className="text-base-content/50 text-sm">
            Admin modules (user management, reports, settings, etc.) will appear here in upcoming updates.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
