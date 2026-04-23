import { useState } from "react";
import API from "../api/api";

export default function Register({ setToken }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registered Successfully ✅");

      // auto login after register
      setToken(res.data.token);

    } catch (err) {
      alert("Register Failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}