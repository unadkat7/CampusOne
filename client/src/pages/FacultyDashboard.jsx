import { useAuth } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";

/**
 * FacultyDashboard — shell page for the faculty role.
 * Accessible only to authenticated users with role "faculty".
 */
export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <DashboardShell role="faculty" title="Faculty Dashboard">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            👋 Welcome, {user?.name || "Faculty"}!
          </h2>
          <p className="text-base-content/60 mt-2">
            You are logged in as <span className="badge badge-secondary">Faculty</span> in the{" "}
            <span className="font-semibold">{user?.department || "N/A"}</span> department.
          </p>
          <div className="divider"></div>
          <p className="text-base-content/50 text-sm">
            Your dashboard modules (courses, attendance management, grading, etc.) will appear here in upcoming updates.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
