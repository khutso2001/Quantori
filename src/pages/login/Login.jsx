import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState("");
  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",

        JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  return (
    <div>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
