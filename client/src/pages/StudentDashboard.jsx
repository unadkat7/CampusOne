import { useAuth } from "../context/AuthContext";
import DashboardShell from "../components/DashboardShell";

/**
 * StudentDashboard — shell page for the student role.
 * Accessible only to authenticated users with role "student".
 */
export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardShell role="student" title="Student Dashboard">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            👋 Welcome, {user?.name || "Student"}!
          </h2>
          <p className="text-base-content/60 mt-2">
            You are logged in as a <span className="badge badge-primary">Student</span> in the{" "}
            <span className="font-semibold">{user?.department || "N/A"}</span> department.
          </p>
          <div className="divider"></div>
          <p className="text-base-content/50 text-sm">
            Your dashboard modules (attendance, courses, fees, etc.) will appear here in upcoming updates.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
