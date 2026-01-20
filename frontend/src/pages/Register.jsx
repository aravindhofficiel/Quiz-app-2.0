import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Register({ goLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.role
      );
      setMsg("Registered successfully. You can login now.");
    } catch {
      setMsg("Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

        {msg && <p>{msg}</p>}

      <form onSubmit={submit}>
          <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button>Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={goLogin}>
          Login
        </button>
      </p>
    </div>
  );
}
