import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", form);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <input className="form-control my-2" placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input className="form-control my-2" placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input className="form-control my-2" type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input className="form-control my-2" placeholder="Course"
        onChange={(e) => setForm({ ...form, course: e.target.value })}
      />

      <button className="btn btn-success" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}