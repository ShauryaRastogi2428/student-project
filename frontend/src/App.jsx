import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const [token, setToken] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (t) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  if (!token) {
    return (
      <>
        {isRegister ? (
          <Register setToken={handleLogin} />
        ) : (
          <Login setToken={handleLogin} />
        )}

        <div style={{ textAlign: "center" }}>
          <button onClick={() => setIsRegister(!isRegister)}>
            Switch to {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </>
    );
  }

  return <Dashboard token={token} logout={logout} />;
}

export default App;