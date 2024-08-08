import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { token, refreshToken } = response.data;
      setToken(token);
      setRefreshToken(refreshToken);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Login successful:", response.data);
      getUserInfo(token);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await axiosInstance.get(
        "https://dummyjson.com/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo(response.data);
      console.log("User info:", response.data);
    } catch (error) {
      console.error(
        "Failed to fetch user info:",
        error.response?.data || error.message
      );
    }
  };

  const refreshAuthToken = async () => {
    try {
      const response = await fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);

      console.log("Token refreshed:", data.token);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const storedRefreshToken = localStorage.getItem("refreshToken");
          const newToken = await refreshAuthToken(storedRefreshToken);
          setToken(newToken);
          localStorage.setItem("token", newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

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

      <button onClick={() => getUserInfo(token)}>Fetch User Info</button>
      <button onClick={refreshAuthToken}>Refresh</button>
    </div>
  );
};

export default Home;
