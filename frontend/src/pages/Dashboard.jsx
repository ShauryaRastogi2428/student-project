import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [course, setCourse] = useState("");
  const [pass, setPass] = useState({});

  const authHeader = {
    headers: { Authorization: token },
  };

  // Update Course
  const updateCourse = async () => {
    try {
      await API.put("/update-course", { course }, authHeader);
      alert("Course Updated");
    } catch (err) {
      alert("Error");
    }
  };

  // Update Password
  const updatePassword = async () => {
    try {
      await API.put("/update-password", pass, authHeader);
      alert("Password Updated");
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>

      <div className="card p-3">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Course:</b> {user.course}</p>
      </div>

      <hr />

      <h4>Update Course</h4>
      <input
        className="form-control my-2"
        placeholder="New Course"
        onChange={(e) => setCourse(e.target.value)}
      />
      <button className="btn btn-warning" onClick={updateCourse}>
        Update Course
      </button>

      <hr />

      <h4>Update Password</h4>
      <input
        className="form-control my-2"
        type="password"
        placeholder="Old Password"
        onChange={(e) => setPass({ ...pass, oldPassword: e.target.value })}
      />

      <input
        className="form-control my-2"
        type="password"
        placeholder="New Password"
        onChange={(e) => setPass({ ...pass, newPassword: e.target.value })}
      />

      <button className="btn btn-danger" onClick={updatePassword}>
        Update Password
      </button>

      <hr />

      <button className="btn btn-dark" onClick={logout}>
        Logout
      </button>
    </div>
  );
}