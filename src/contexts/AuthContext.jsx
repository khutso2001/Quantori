import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState(null);

  const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post("https://dummyjson.com/auth/refresh", {
        refreshToken: refreshToken,
        expiresInMins: 30,
      });

      login(response.data.token, response.data.refreshToken);
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
        await refreshAuthToken();
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    const fetchUserData = async () => {
      if (storedToken) {
        try {
          const response = await axiosInstance.get(
            "https://dummyjson.com/auth/me",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      fetchUserData();
    }
  }, []);

  const logout = () => {
    setToken("");
    setRefreshToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const login = (token, refreshToken) => {
    setToken(token);
    setRefreshToken(refreshToken);

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        setRefreshToken,
        axiosInstance,
        user,
        setUser,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
