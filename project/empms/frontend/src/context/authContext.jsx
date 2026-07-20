import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = usestate(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:300/api/auth/verify",
          {}, // request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (data.success) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Verification failed:", error);

        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
export const useAuth = () => useContext(UserContext);
export default AuthContext;
