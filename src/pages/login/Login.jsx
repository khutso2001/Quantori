import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      });

      login(response.data.token, response.data.refreshToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login">
      <div className="loginInputs">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginButtons">
          <button>Cancel</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
