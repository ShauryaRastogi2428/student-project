import { useState } from "react";
import API from "../api/api";

export default function Login({ setToken }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // check token safely
      if (res.data && res.data.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        alert("Login Successful ✅");
      } else {
        alert(res.data?.msg || "Login Failed ❌");
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}