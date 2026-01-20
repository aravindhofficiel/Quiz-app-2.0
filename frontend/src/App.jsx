import { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

export default function App() {
  const { user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <Register goLogin={() => setShowRegister(false)} />
    ) : (
      <Login goRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="container">
      <div className="topbar"style={{ maxWidth: "800px" }}>
        <strong>{user.role.toUpperCase()}</strong>
        <button onClick={logout}>Logout</button>
      </div>

      {user.role === "admin" && <AdminDashboard />}
      {user.role === "teacher" && <TeacherDashboard />}
      {user.role === "student" && <StudentDashboard />}
    </div>
  );
}
