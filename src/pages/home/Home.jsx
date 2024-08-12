import quantoriLogo from "../../images/quantoriLogo.png";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
export default function Home() {
  const { login, setUser } = useContext(AuthContext);
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

      const data = await axios.get("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      setUser(data.data);
      navigate("/about");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="home">
      <img src={quantoriLogo} alt="Quantori Logo" />
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
